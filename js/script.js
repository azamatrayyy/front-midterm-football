$(document).ready(function () {
  const themeButton = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("aitu-theme");
  
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeButton.textContent = theme === "dark" ? "Light theme" : "Dark theme";
    themeButton.setAttribute("aria-pressed", theme === "dark");
  }
  
  applyTheme(savedTheme === "dark" ? "dark" : "light");
  
  themeButton.addEventListener("click", function () {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("aitu-theme", theme);
    applyTheme(theme);
  });
  
  let user = null;
  try {
    const savedUser = JSON.parse(localStorage.getItem("aitu-user"));
    if (savedUser && typeof savedUser.name === "string" && typeof savedUser.email === "string") {
      user = savedUser;
    }
  } catch (error) {
    localStorage.removeItem("aitu-user");
  }
  
  function showUser() {
    document.getElementById("sign-in-link").hidden = user !== null;
    document.getElementById("sign-out").hidden = user === null;
    document.getElementById("user-name").textContent = user ? "Hi, " + user.name : "";
    const form = document.getElementById("sign-in-form");
    if (form) {
      form.hidden = user !== null;
      document.getElementById("account-panel").hidden = user === null;
      document.getElementById("account-name").textContent = user ? user.name : "";
    }
  }
  
  document.getElementById("sign-out").addEventListener("click", function () {
    localStorage.removeItem("aitu-user");
    user = null;
    showUser();
  });
  
  showUser();
  
  const signInForm = document.getElementById("sign-in-form");
  if (signInForm) {
    signInForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("login-name").value.trim();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const message = document.getElementById("login-message");
      if (name.length < 2 || name.length > 40) {
        message.textContent = "Enter a name between 2 and 40 characters.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Enter a valid email address.";
        return;
      }
      if (password.trim().length < 6) {
        message.textContent = "Enter at least 6 characters for the demo password.";
        return;
      }
      user = { name: name, email: email };
      localStorage.setItem("aitu-user", JSON.stringify(user));
      signInForm.reset();
      message.textContent = "";
      showUser();
    });
  }
  
  const teamForm = document.getElementById("team-form");
  if (teamForm) {
    const select = document.getElementById("team-select");
    const status = document.getElementById("team-status");
    const results = document.getElementById("team-results");
    const button = document.getElementById("team-load");
  
    function addDetail(list, label, value) {
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value || "Not available";
      list.append(term, description);
    }
  
    async function loadTeam() {
      const id = select.value;
      if (!["133604", "133602", "133612"].includes(id)) {
        status.textContent = "Please select a club from the list.";
        return;
      }
      const controller = new AbortController();
      const timer = setTimeout(function () { controller.abort(); }, 12000);
      results.replaceChildren();
      status.textContent = "Loading club information...";
      results.setAttribute("aria-busy", "true");
      button.disabled = true;
      select.disabled = true;
      try {
        const response = await fetch("https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=" + id, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        if (!data || !Object.prototype.hasOwnProperty.call(data, "teams")) {
          throw new Error("Invalid response");
        }
        if (data.teams === null || (Array.isArray(data.teams) && data.teams.length === 0)) {
          status.textContent = "No club information was found. Select another club and try again.";
          return;
        }
        if (!Array.isArray(data.teams)) throw new Error("Invalid response");
        const team = data.teams[0];
        if (!team || typeof team.strTeam !== "string" || team.strSport !== "Soccer" || String(team.idTeam) !== id) {
          throw new Error("Invalid club data");
        }
        const card = document.createElement("article");
        card.className = "team-card";
        const heading = document.createElement("h3");
        heading.textContent = team.strTeam;
        card.append(heading);
        const details = document.createElement("dl");
        details.className = "team-details";
        addDetail(details, "Country", team.strCountry);
        addDetail(details, "League", team.strLeague);
        addDetail(details, "Stadium", team.strStadium);
        addDetail(details, "Founded", team.intFormedYear);
        card.append(details);
        const link = document.createElement("a");
        link.href = "https://www.thesportsdb.com/team/" + id;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "View club on TheSportsDB";
        card.append(link);
        results.append(card);
        status.textContent = "Club information loaded for " + team.strTeam + ".";
      } catch (error) {
        results.replaceChildren();
        status.textContent = "Club information is unavailable. Check your connection and press Load club to try again.";
      } finally {
        clearTimeout(timer);
        results.setAttribute("aria-busy", "false");
        button.disabled = false;
        select.disabled = false;
      }
    }
  
    teamForm.addEventListener("submit", function (event) {
      event.preventDefault();
      loadTeam();
    });
    loadTeam();
  }

const regForm = document.getElementById("registration-form");

  if (regForm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nonEmptyPattern = /\S/;
    const minSixPattern = /^.{6,}$/;
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    const validateName = () => {
      const val = $("#player-name").val();
      if (!nonEmptyPattern.test(val)) {
        $("#player-name").removeClass("is-valid").addClass("is-invalid");
        $("#name-error").text("✖ Name is required.");
        return false;
      } else {
        $("#player-name").removeClass("is-invalid").addClass("is-valid");
        $("#name-valid").text("✔ Name looks good.");
        return true;
      }
    };

    const validateEmail = () => {
      const val = $("#player-email").val();
      if (!nonEmptyPattern.test(val)) {
        $("#player-email").removeClass("is-valid").addClass("is-invalid");
        $("#email-error").text("✖ Email is required.");
        return false;
      } else if (!emailPattern.test(val)) {
        $("#player-email").removeClass("is-valid").addClass("is-invalid");
        $("#email-error").text("✖ Please enter a valid email address.");
        return false;
      } else {
        $("#player-email").removeClass("is-invalid").addClass("is-valid");
        $("#email-valid").text("✔ Valid email format.");
        return true;
      }
    };

    const updatePasswordStrength = () => {
      const val = $("#player-password").val();
      const bar = $("#password-strength-bar");
      const text = $("#password-strength-text");

      bar.removeClass("strength-weak strength-medium strength-strong");

      if (val === "") {
        bar.css("width", "0%");
        text.text("");
      } else if (strongPattern.test(val)) {
        bar.css("width", "100%").addClass("strength-strong");
        text.text("✔ Password strength: Strong");
      } else if (minSixPattern.test(val)) {
        bar.css("width", "66%").addClass("strength-medium");
        text.text("▲ Password strength: Medium");
      } else {
        bar.css("width", "33%").addClass("strength-weak");
        text.text("✖ Password strength: Weak");
      }
    };

    const validatePassword = () => {
      const val = $("#player-password").val();
      updatePasswordStrength();

      if (!nonEmptyPattern.test(val)) {
        $("#player-password").removeClass("is-valid").addClass("is-invalid");
        $("#password-error").text("✖ Password is required.");
        return false;
      } else if (!minSixPattern.test(val)) {
        $("#player-password").removeClass("is-valid").addClass("is-invalid");
        $("#password-error").text("✖ Password must be at least 6 characters.");
        return false;
      } else {
        $("#player-password").removeClass("is-invalid").addClass("is-valid");
        $("#password-valid").text("✔ Password accepted.");
        return true;
      }
    };

    const validateConfirmPassword = () => {
      const passVal = $("#player-password").val();
      const confirmVal = $("#player-confirm-password").val();

      if (!nonEmptyPattern.test(confirmVal)) {
        $("#player-confirm-password").removeClass("is-valid").addClass("is-invalid");
        $("#confirm-error").text("✖ Please confirm your password.");
        return false;
      } else if (confirmVal !== passVal) {
        $("#player-confirm-password").removeClass("is-valid").addClass("is-invalid");
        $("#confirm-error").text("✖ Passwords do not match.");
        return false;
      } else {
        $("#player-confirm-password").removeClass("is-invalid").addClass("is-valid");
        $("#confirm-valid").text("✔ Passwords match.");
        return true;
      }
    };

    const validateMessage = () => {
      const val = $("#player-message").val();
      if (!nonEmptyPattern.test(val)) {
        $("#player-message").removeClass("is-valid").addClass("is-invalid");
        $("#message-error").text("✖ Message is required.");
        return false;
      } else {
        $("#player-message").removeClass("is-invalid").addClass("is-valid");
        $("#message-valid").text("✔ Message looks good.");
        return true;
      }
    };

    $("#player-name").keyup(validateName).blur(validateName);
    $("#player-email").keyup(validateEmail).blur(validateEmail);
    $("#player-password").keyup(() => {
      validatePassword();
      if ($("#player-confirm-password").val() !== "") {
        validateConfirmPassword();
      }
    }).blur(validatePassword);
    $("#player-confirm-password").keyup(validateConfirmPassword).blur(validateConfirmPassword);
    $("#player-message").keyup(validateMessage).blur(validateMessage);

    $("#registration-form").on("submit", function (event) {
      event.preventDefault();
      const isNameOk = validateName();
      const isEmailOk = validateEmail();
      const isPassOk = validatePassword();
      const isConfirmOk = validateConfirmPassword();
      const isMsgOk = validateMessage();

      if (isNameOk && isEmailOk && isPassOk && isConfirmOk && isMsgOk) {
        $("#form-alert")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .text("✔ Details checked successfully. This demo does not send a registration.")
          .hide()
          .fadeIn();
        $("#player-name").val("").removeClass("is-valid is-invalid");
        $("#player-email").val("").removeClass("is-valid is-invalid");
        $("#player-password").val("").removeClass("is-valid is-invalid");
        $("#player-confirm-password").val("").removeClass("is-valid is-invalid");
        $("#player-message").val("").removeClass("is-valid is-invalid");
        $("#password-strength-bar").css("width", "0%").removeClass("strength-weak strength-medium strength-strong");
        $("#password-strength-text").text("");
      } else {
        $("#form-alert")
          .removeClass("alert-success")
          .addClass("alert-danger")
          .text("✖ Please fix the highlighted errors before submitting.")
          .hide()
          .fadeIn();
      }
    });
  }

  const matchesTable = document.getElementById("matches-table");

  if (matchesTable) {
    let matchesList = [
      {
        date: "November 21",
        teams: "AITU FC vs. Astana City College",
        category: "Friendly",
        location: "AITU Sports Ground",
        time: "10:00 AM"
      },
      {
        date: "November 28",
        teams: "AITU FC vs. Campus United",
        category: "League",
        location: "University Field",
        time: "2:00 PM"
      },
      {
        date: "December 5",
        teams: "AITU FC vs. Student Stars",
        category: "Cup",
        location: "AITU Sports Ground",
        time: "11:30 AM"
      }
    ];

    try {
      const saved = JSON.parse(localStorage.getItem("aitu-matches"));
      if (Array.isArray(saved) && saved.every(function (match) {
        return match && ["date", "teams", "category", "location", "time"].every(function (key) {
          return typeof match[key] === "string";
        });
      })) matchesList = saved;
    } catch (error) {
      localStorage.removeItem("aitu-matches");
    }

    function escapeText(value) {
      const span = document.createElement("span");
      span.textContent = value;
      return span.innerHTML;
    }

    let selectedCategory = "All";
    let editIndex = -1;

    const filterMatches = () => {
      const searchValue = $("#match-search").val().toLowerCase();
      const rows = document.querySelectorAll("#matches-tbody tr");

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowText = $(row).text().toLowerCase();
        const rowCategory = $(row).find(".match-category").text().toLowerCase();

        const matchesCategory =
          selectedCategory === "All" ||
          rowCategory === selectedCategory.toLowerCase();
        const matchesSearch = rowText.includes(searchValue);

        if (matchesCategory && matchesSearch) {
          $(row).show();
        } else {
          $(row).hide();
        }
      }
      document.getElementById("match-empty").hidden = Array.from(rows).some(function (row) { return row.style.display !== "none"; });
    };

    const bindRowActions = () => {
      $(".action-btn-edit").click(function () {
        const idx = Number($(this).attr("data-index"));
        const item = matchesList[idx];
        editIndex = idx;

        $("#match-date").val(item.date);
        $("#match-teams").val(item.teams);
        $("#match-category").val(item.category);
        $("#match-location").val(item.location);
        $("#match-time").val(item.time);

        $("#crud-form-title").text("Update Match");
        $("#save-match-btn").text("Update Match");
        $("#cancel-edit-btn").show();
      });

      $(".action-btn-delete").click(function () {
        const idx = Number($(this).attr("data-index"));
        const item = matchesList[idx];
        if (document.querySelector(".action-btn-delete[disabled]")) return;
        const isConfirmed = confirm(`Delete match "${item.teams}"?`);

        if (isConfirmed) {
          $(".action-btn-delete, .action-btn-edit, #save-match-btn").prop("disabled", true);
          const rowEl = $(this).closest("tr");
          rowEl.fadeOut(300, () => {
            matchesList.splice(idx, 1);
            resetCrudForm();
            localStorage.setItem("aitu-matches", JSON.stringify(matchesList));
            renderTable();
            $("#save-match-btn").prop("disabled", false);
          });
        }
      });
    };

    const renderTable = () => {
      const tbody = $("#matches-tbody");
      tbody.empty();

      for (let i = 0; i < matchesList.length; i++) {
        const item = matchesList[i];
        const rowHtml = `
          <tr>
            <td>${escapeText(item.date)}</td>
            <td>${escapeText(item.teams)}</td>
            <td class="match-category">${escapeText(item.category)}</td>
            <td>${escapeText(item.location)}</td>
            <td>${escapeText(item.time)}</td>
            <td>
              <button type="button" class="action-btn-edit" data-index="${i}">Edit</button>
              <button type="button" class="action-btn-delete" data-index="${i}">Delete</button>
            </td>
          </tr>
        `;
        tbody.append(rowHtml);
      }

      bindRowActions();
      filterMatches();
    };

    const resetCrudForm = () => {
      editIndex = -1;
      $("#match-date").val("");
      $("#match-teams").val("");
      $("#match-category").val("Friendly");
      $("#match-location").val("");
      $("#match-time").val("");
      $("#crud-form-title").text("Add New Match");
      $("#save-match-btn").text("Add Match");
      $("#cancel-edit-btn").hide();
    };

    $("#crud-form").on("submit", function (event) {
      event.preventDefault();
      const dateVal = $("#match-date").val().trim();
      const teamsVal = $("#match-teams").val().trim();
      const categoryVal = $("#match-category").val();
      const locationVal = $("#match-location").val().trim();
      const timeVal = $("#match-time").val().trim();

      if (
        dateVal === "" ||
        teamsVal === "" ||
        locationVal === "" ||
        timeVal === ""
      ) {
        $("#crud-alert")
          .removeClass("alert-success")
          .addClass("alert-danger")
          .text("✖ Please fill in all match fields.")
          .hide()
          .fadeIn();
        return;
      }

      const matchObj = {
        date: dateVal,
        teams: teamsVal,
        category: categoryVal,
        location: locationVal,
        time: timeVal
      };

      if (editIndex === -1) {
        matchesList.push(matchObj);
        $("#crud-alert")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .text("✔ New match added to schedule.")
          .hide()
          .fadeIn();
      } else {
        matchesList[editIndex] = matchObj;
        $("#crud-alert")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .text("✔ Match updated successfully.")
          .hide()
          .fadeIn();
      }

      localStorage.setItem("aitu-matches", JSON.stringify(matchesList));
      resetCrudForm();
      renderTable();
    });

    $("#cancel-edit-btn").click(() => {
      resetCrudForm();
    });

    $("#match-search").on("input", filterMatches);

    $(".category-btn").click(function () {
      $(".category-btn").removeClass("active-category");
      $(this).addClass("active-category");
      selectedCategory = $(this).text();
      filterMatches();
    });

    renderTable();
  }

  const galleryContainer = document.getElementById("club-gallery");

  if (galleryContainer) {
    const galleryPhotos = document.querySelectorAll(".gallery-photo");
    let currentPhotoIndex = 0;
    let photoOpener = null;

    const showLightboxPhoto = (index) => {
      const photoEl = galleryPhotos[index];
      const imgEl = $(photoEl).find("img");
      const badgeText = $(photoEl).find(".photo-badge").text();
      const imgSrc = imgEl.attr("src");
      const imgAlt = imgEl.attr("alt");

      $("#lightbox-img").fadeOut(150, () => {
        $("#lightbox-img")
          .attr("src", imgSrc)
          .attr("alt", imgAlt)
          .css("opacity", "0.4")
          .fadeIn(150)
          .animate({ opacity: 1 }, 200);
        $("#lightbox-caption").text(`${badgeText} — ${imgAlt}`);
      });
    };

    for (let i = 0; i < galleryPhotos.length; i++) {
      $(galleryPhotos[i]).attr("data-index", i);
    }

    $(".gallery-photo").click(function () {
      photoOpener = this;
      document.body.classList.add("lightbox-open");
      currentPhotoIndex = Number($(this).attr("data-index"));
      const photoEl = galleryPhotos[currentPhotoIndex];
      const imgEl = $(photoEl).find("img");
      const badgeText = $(photoEl).find(".photo-badge").text();

      $("#lightbox-img").attr("src", imgEl.attr("src")).attr("alt", imgEl.attr("alt"));
      $("#lightbox-caption").text(`${badgeText} — ${imgEl.attr("alt")}`);
      $("#lightbox-overlay").css("display", "flex").hide().fadeIn(250);
      document.getElementById("lightbox-close").focus();
    });

    $(".gallery-photo").on("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        $(this).click();
      }
    });
    $(document).on("keydown", function (event) {
      if (!document.body.classList.contains("lightbox-open")) return;
      if (event.key === "Escape") $("#lightbox-close").click();
      if (event.key === "ArrowLeft") $("#lightbox-prev").click();
      if (event.key === "ArrowRight") $("#lightbox-next").click();
      if (event.key === "Tab") {
        const first = document.getElementById("lightbox-close");
        const last = document.getElementById("lightbox-next");
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });

    $("#lightbox-next").click(() => {
      currentPhotoIndex = currentPhotoIndex + 1;
      if (currentPhotoIndex >= galleryPhotos.length) {
        currentPhotoIndex = 0;
      }
      showLightboxPhoto(currentPhotoIndex);
    });

    $("#lightbox-prev").click(() => {
      currentPhotoIndex = currentPhotoIndex - 1;
      if (currentPhotoIndex < 0) {
        currentPhotoIndex = galleryPhotos.length - 1;
      }
      showLightboxPhoto(currentPhotoIndex);
    });

    $("#lightbox-close").click(() => {
      $("#lightbox-overlay").fadeOut(250);
      document.body.classList.remove("lightbox-open");
      if (photoOpener) photoOpener.focus();
    });

    $("#lightbox-overlay").click(function (e) {
      if (e.target.id === "lightbox-overlay") {
        $("#lightbox-overlay").fadeOut(250);
      document.body.classList.remove("lightbox-open");
      if (photoOpener) photoOpener.focus();
      }
    });
  }

  $(".faq-question").on("click", function () {
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded));
    $(this).find(".faq-icon").text(expanded ? "+" : "−");
    $(this).next(".faq-answer").stop(true, true).slideToggle(250);
  });
});
