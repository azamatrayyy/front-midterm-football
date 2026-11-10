$(document).ready(() => {
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

    $("#submit-btn").click(() => {
      const isNameOk = validateName();
      const isEmailOk = validateEmail();
      const isPassOk = validatePassword();
      const isConfirmOk = validateConfirmPassword();
      const isMsgOk = validateMessage();

      if (isNameOk && isEmailOk && isPassOk && isConfirmOk && isMsgOk) {
        $("#form-alert")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .text("✔ Registration submitted successfully!")
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
    const matchesList = [
      {
        date: "October 10",
        teams: "AITU FC vs. Astana City College",
        category: "Friendly",
        location: "AITU Sports Ground",
        time: "10:00 AM"
      },
      {
        date: "October 17",
        teams: "AITU FC vs. Campus United",
        category: "League",
        location: "University Field",
        time: "2:00 PM"
      },
      {
        date: "October 24",
        teams: "AITU FC vs. Student Stars",
        category: "Cup",
        location: "AITU Sports Ground",
        time: "11:30 AM"
      }
    ];

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
        const isConfirmed = confirm(`Delete match "${item.teams}"?`);

        if (isConfirmed) {
          const rowEl = $(this).closest("tr");
          rowEl.fadeOut(300, () => {
            matchesList.splice(idx, 1);
            renderTable();
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
            <td>${item.date}</td>
            <td>${item.teams}</td>
            <td class="match-category">${item.category}</td>
            <td>${item.location}</td>
            <td>${item.time}</td>
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

    $("#save-match-btn").click(() => {
      const dateVal = $("#match-date").val();
      const teamsVal = $("#match-teams").val();
      const categoryVal = $("#match-category").val();
      const locationVal = $("#match-location").val();
      const timeVal = $("#match-time").val();

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

      resetCrudForm();
      renderTable();
    });

    $("#cancel-edit-btn").click(() => {
      resetCrudForm();
    });

    $("#match-search").keyup(filterMatches);

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
      currentPhotoIndex = Number($(this).attr("data-index"));
      const photoEl = galleryPhotos[currentPhotoIndex];
      const imgEl = $(photoEl).find("img");
      const badgeText = $(photoEl).find(".photo-badge").text();

      $("#lightbox-img").attr("src", imgEl.attr("src")).attr("alt", imgEl.attr("alt"));
      $("#lightbox-caption").text(`${badgeText} — ${imgEl.attr("alt")}`);
      $("#lightbox-overlay").css("display", "flex").hide().fadeIn(250);
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
    });

    $("#lightbox-overlay").click(function (e) {
      if (e.target.id === "lightbox-overlay") {
        $("#lightbox-overlay").fadeOut(250);
      }
    });
  }
});
