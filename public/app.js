"use strict";

(() => {

  const T = {

    en: {

      comingSoon: "COMING SOON IN QATAR",

      eyebrow: "FOR CURIOUS LITTLE MINDS",

      hero1: "A bigger world",

      hero2: "awaits little minds.",

      heroDesc:

        "Less scrolling. More exploring. Discover activities that help your kids play, learn and grow.",

      benefit1: "Explore activities",

      benefit2: "Find their spark",

      benefit3: "Grow every day",

      activityCaption: "More play. More possibility.",

      heroNote: "A new way to discover after-school activities in Qatar.",

      joinKicker: "THE FIRST STEP STARTS HERE",

      formTitle: "Be first in line.",

      formDesc: "We're nearly ready. Join the list in a few taps.",

      tabParent: "I'm a parent",

      tabAcademy: "I'm an academy",

      nameLabel: "Full name",

      namePlaceholder: "Your full name",

      roleLabel: "I am a",

      mother: "Mother",

      father: "Father",

      mobileLabel: "Mobile number",

      emailLabel: "Email address",

      kidsTitle: "Tell us about your kids",

      kidsSub: "Optional · Get priority early access",

      addKid: "Add another child",

      child: "CHILD",

      childName: "Name",

      childNamePlaceholder: "First name",

      age: "Age",

      ageSelect: "Age",

      gender: "Gender",

      genderSelect: "Select",

      boy: "Boy",

      girl: "Girl",

      genderOther: "Prefer not to say",

      removeKid: "Remove",

      parentConsent:

        "I agree to receive Kidgage launch updates and confirm I am the parent or guardian of any children listed.",

      privacy: "Privacy notice",

      parentSubmit: "Join the waitlist",

      parentFoot: "Free to join. No commitment.",

      academyDesc:

        "Meet more families. Register your academy and we'll reach out ahead of launch.",

      academyNameLabel: "Academy name",

      academyNamePlaceholder: "Name of your academy",

      contactNameLabel: "Contact person",

      academyExtraTitle: "Tell us a little more",

      academyExtraSub: "Optional · Helps us connect faster",

      categoryLabel: "Activity category",

      categoryPlaceholder: "Select a category",

      catSports: "Sports & Fitness",

      catArt: "Arts & Creativity",

      catMusic: "Music & Dance",

      catStem: "STEM & Learning",

      catOther: "Other",

      areaLabel: "Area in Qatar",

      areaPlaceholder: "e.g. Lusail, West Bay",

      socialLabel: "Website or Instagram",

      socialPlaceholder: "@academy or https://",

      academyConsent:

        "I agree to be contacted about Kidgage academy partnerships.",

      academySubmit: "Register your academy",

      academyFoot: "No fee. No commitment.",

      successTitle: "You're on the list!",

      parentSuccess:

        "Thank you for joining. We'll reach out as Kidgage gets closer to launch.",

      academySuccess:

        "Thanks for registering. Our team will contact your academy ahead of launch.",

      again: "Back to registration",

      footer1: "Made for little adventures.",

      sending: "Submitting…",

      errName: "Please enter your full name.",

      errRole: "Please select Mother or Father.",

      errAcademy: "Please enter your academy name.",

      errContact: "Please enter the contact person’s name.",

      errMobile: "Please enter a valid 8-digit Qatar mobile number.",

      errEmail: "Please enter a valid email address.",

      errConsent: "Please accept the contact consent to continue.",

      errChild:

        "Please complete the details for child {n}, or remove that child.",

      errUnavailable:

        "Registration is unavailable. Please ensure the Kidgage Node.js server is running.",

      errNetwork:

        "We could not save your details. Please check your connection and try again.",

    },

    ar: {

      comingSoon: "قريبًا في قطر",

      eyebrow: "لعقول صغيرة مليئة بالفضول",

      hero1: "عالم أكبر",

      hero2: "ينتظر عقولًا صغيرة.",

      heroDesc:

        "وقت أقل أمام الشاشات. واكتشاف أكثر. أنشطة تساعد أطفالك على اللعب والتعلّم والنمو.",

      benefit1: "استكشف الأنشطة",

      benefit2: "اكتشف شغفهم",

      benefit3: "تطوّر كل يوم",

      activityCaption: "لعب أكثر. فرص أكبر.",

      heroNote: "طريقة جديدة لاكتشاف أنشطة الأطفال في قطر.",

      joinKicker: "خطوتك الأولى تبدأ هنا",

      formTitle: "كن من أوائل المنضمين.",

      formDesc: "اقترب موعد إطلاقنا. سجّل في خطوات بسيطة.",

      tabParent: "أنا ولي أمر",

      tabAcademy: "أمثّل أكاديمية",

      nameLabel: "الاسم الكامل",

      namePlaceholder: "اسمك الكامل",

      roleLabel: "أنا",

      mother: "أم",

      father: "أب",

      mobileLabel: "رقم الجوال",

      emailLabel: "البريد الإلكتروني",

      kidsTitle: "أخبرنا عن أطفالك",

      kidsSub: "اختياري · للحصول على أولوية الوصول المبكر",

      addKid: "إضافة طفل آخر",

      child: "الطفل",

      childName: "الاسم",

      childNamePlaceholder: "اسم الطفل",

      age: "العمر",

      ageSelect: "العمر",

      gender: "الجنس",

      genderSelect: "اختر",

      boy: "ولد",

      girl: "بنت",

      genderOther: "أفضل عدم الإفصاح",

      removeKid: "حذف",

      parentConsent:

        "أوافق على تلقي تحديثات إطلاق Kidgage، وأؤكد أنني ولي أمر الأطفال المذكورين أو الوصي القانوني عليهم.",

      privacy: "إشعار الخصوصية",

      parentSubmit: "انضم إلى قائمة الانتظار",

      parentFoot: "الانضمام مجاني. دون أي التزام.",

      academyDesc:

        "ساعد المزيد من العائلات على اكتشاف أكاديميتك. سجّل اهتمامك وسنتواصل معك قبل الإطلاق.",

      academyNameLabel: "اسم الأكاديمية",

      academyNamePlaceholder: "اسم أكاديميتك",

      contactNameLabel: "الشخص المسؤول",

      academyExtraTitle: "أخبرنا المزيد",

      academyExtraSub: "اختياري · يساعدنا على التواصل معك",

      categoryLabel: "نوع النشاط",

      categoryPlaceholder: "اختر نوع النشاط",

      catSports: "الرياضة واللياقة",

      catArt: "الفنون والإبداع",

      catMusic: "الموسيقى والرقص",

      catStem: "العلوم والتكنولوجيا والتعلّم",

      catOther: "أخرى",

      areaLabel: "المنطقة في قطر",

      areaPlaceholder: "مثل لوسيل أو الخليج الغربي",

      socialLabel: "الموقع الإلكتروني أو إنستغرام",

      socialPlaceholder: "@academy أو https://",

      academyConsent:

        "أوافق على تواصل فريق Kidgage معي بشأن الشراكة مع الأكاديمية.",

      academySubmit: "سجّل أكاديميتك",

      academyFoot: "دون رسوم أو التزامات.",

      successTitle: "تم تسجيلك بنجاح!",

      parentSuccess: "شكرًا لانضمامك. سنتواصل معك مع اقتراب إطلاق Kidgage.",

      academySuccess: "شكرًا لتسجيل أكاديميتك. سيتواصل معك فريقنا قبل الإطلاق.",

      again: "العودة إلى التسجيل",

      footer1: "صنعناه لمغامرات الصغار.",

      sending: "جارٍ الإرسال…",

      errName: "يرجى إدخال الاسم الكامل.",

      errRole: "يرجى اختيار أم أو أب.",

      errAcademy: "يرجى إدخال اسم الأكاديمية.",

      errContact: "يرجى إدخال اسم الشخص المسؤول.",

      errMobile: "يرجى إدخال رقم جوال قطري صحيح من ٨ أرقام.",

      errEmail: "يرجى إدخال بريد إلكتروني صحيح.",

      errConsent: "يرجى الموافقة على التواصل للمتابعة.",

      errChild: "يرجى استكمال بيانات الطفل {n} أو حذفه.",

      errUnavailable:

        "التسجيل غير متاح حاليًا. يرجى التأكد من تشغيل خادم Kidgage.",

      errNetwork: "تعذّر حفظ بياناتك. يرجى التحقق من الاتصال وإعادة المحاولة.",

    },

  };

  let language =

    new URLSearchParams(location.search).get("lang") === "ar" ? "ar" : "en";

  const byId = (id) => document.getElementById(id);

  const tabs = [...document.querySelectorAll(".audience-tab")];

  const panels = {

    parent: byId("panel-parent"),

    academy: byId("panel-academy"),

  };

  let activeTab = "parent";

  let nextChildId = 0;

  const tr = (name) => T[language][name] ?? T.en[name] ?? name;



  function applyLanguage(target, updateUrl = true) {

    language = target === "ar" ? "ar" : "en";

    document.documentElement.lang = language;

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    byId("lang-en").classList.toggle("is-active", language === "en");

    byId("lang-ar").classList.toggle("is-active", language === "ar");

    byId("lang-en").setAttribute("aria-pressed", String(language === "en"));

    byId("lang-ar").setAttribute("aria-pressed", String(language === "ar"));

    document.querySelectorAll("[data-i18n]").forEach((el) => {

      el.textContent = tr(el.dataset.i18n);

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

      el.placeholder = tr(el.dataset.i18nPlaceholder);

    });

    document.querySelectorAll('[name="language"]').forEach((el) => {

      el.value = language;

    });

    document.querySelectorAll(".kid-card").forEach((el, i) => {

      el.querySelector(".kid-number").textContent = `${tr("child")} ${i + 1}`;

    });

    const privacyLinks = document.querySelectorAll('a[href^="/privacy.html"]');

    privacyLinks.forEach(

      (el) =>

        (el.href = "/privacy.html" + (language === "ar" ? "?lang=ar" : "")),

    );

    if (updateUrl) {

      const url = new URL(window.location.href);

      if (language === "ar") url.searchParams.set("lang", "ar");

      else url.searchParams.delete("lang");

      history.replaceState({}, "", url.pathname + url.search + url.hash);

    }

  }

  byId("lang-en").addEventListener("click", () => applyLanguage("en"));

  byId("lang-ar").addEventListener("click", () => applyLanguage("ar"));



  function openTab(name, focus = false) {

    activeTab = name;

    tabs.forEach((tab) => {

      const on = tab.dataset.tab === name;

      tab.classList.toggle("is-active", on);

      tab.setAttribute("aria-selected", String(on));

      tab.tabIndex = on ? 0 : -1;

      if (on && focus) tab.focus();

    });

    Object.entries(panels).forEach(([key, panel]) => {

      panel.hidden = key !== name;

    });

    byId("success-panel").hidden = true;

    document.querySelector(".audience-switch").hidden = false;

    document.querySelectorAll(".form-error").forEach((el) => {

      el.textContent = "";

    });

  }

  tabs.forEach((tab) =>

    tab.addEventListener("click", () => openTab(tab.dataset.tab)),

  );

  document

    .querySelector(".audience-switch")

    .addEventListener("keydown", (event) => {

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();

      const i = tabs.findIndex((tab) => tab.dataset.tab === activeTab);

      openTab(tabs[(i + 1) % tabs.length].dataset.tab, true);

    });



  function toggleDisclosure(toggleId, bodyId, firstChild = false) {

    const button = byId(toggleId),

      body = byId(bodyId);

    button.addEventListener("click", () => {

      const opening = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(opening));

      body.hidden = !opening;

      if (opening && firstChild && !byId("kids-list").children.length)

        addChild();

    });

  }

  toggleDisclosure("kids-toggle", "kids-body", true);

  toggleDisclosure("academy-toggle", "academy-body");



  function addChild() {
    if (byId("kids-list").children.length >= 8) return;
    nextChildId++;

    const id = nextChildId;

    const card = document.createElement("div");

    card.className = "kid-card";

    card.innerHTML = `<div class="kid-head"><span class="kid-number"></span><button type="button" class="remove-kid"><svg class="icon"><use href="#icon-trash"/></svg><span data-i18n="removeKid"></span></button></div>

      <div class="kid-fields">

        <div class="field"><label for="kid-name-${id}" data-i18n="childName"></label><input id="kid-name-${id}" data-child-field="name" type="text" maxlength="70" autocomplete="off" data-i18n-placeholder="childNamePlaceholder"></div>

        <div class="field"><label for="kid-age-${id}" data-i18n="age"></label><select id="kid-age-${id}" data-child-field="age"><option value="" data-i18n="ageSelect"></option>${Array.from({ length: 18 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}</select></div>

        <div class="field"><label for="kid-gender-${id}" data-i18n="gender"></label><select id="kid-gender-${id}" data-child-field="gender"><option value="" data-i18n="genderSelect"></option><option value="Boy" data-i18n="boy"></option><option value="Girl" data-i18n="girl"></option><option value="Prefer not to say" data-i18n="genderOther"></option></select></div>

      </div>`;

    byId("kids-list").appendChild(card);

    card.querySelector(".remove-kid").addEventListener("click", () => {

      card.remove();

      refreshChildren();

    });

    refreshChildren();

    card.querySelectorAll("[data-i18n]").forEach((el) => {

      el.textContent = tr(el.dataset.i18n);

    });

    card.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

      el.placeholder = tr(el.dataset.i18nPlaceholder);

    });

  }

  function refreshChildren() {

    [...byId("kids-list").children].forEach((el, i) => {

      el.querySelector(".kid-number").textContent = `${tr("child")} ${i + 1}`;

    });

  }

  byId("add-kid").addEventListener("click", addChild);



  const clean = (input) => String(input || "").trim();

  function normalizeQatarNumber(value) {

    let digits = clean(value)

      .replace(/[\u0660-\u0669]/g, (ch) => String(ch.charCodeAt(0) - 0x0660))

      .replace(/[\u06F0-\u06F9]/g, (ch) => String(ch.charCodeAt(0) - 0x06f0))

      .replace(/\D/g, "");

    if (digits.startsWith("00974")) digits = digits.substring(5);

    if (digits.startsWith("974") && digits.length === 11)

      digits = digits.substring(3);

    return /^\d{8}$/.test(digits) ? "+974" + digits : null;

  }

  function error(form, field, message) {

    const box = form.querySelector(".form-error");

    box.textContent = message;

    if (field) {

      const shell = field.closest(".phone-wrap");

      (shell || field).classList.add("is-invalid");

      field.focus();

    }

    return false;

  }

  function validate(form, kind) {

    form

      .querySelectorAll(".is-invalid")

      .forEach((el) => el.classList.remove("is-invalid"));

    form.querySelector(".form-error").textContent = "";

    const field = (name) => form.elements.namedItem(name);

    const name = kind === "parent" ? field("fullName") : field("academyName");

    if (clean(name.value).length < 2)

      return error(

        form,

        name,

        tr(kind === "parent" ? "errName" : "errAcademy"),

      );

    if (kind === "parent") {

      if (!form.querySelector('[name="parentType"]:checked'))

        return error(form, field("parentType")[0], tr("errRole"));

    } else {

      if (clean(field("contactName").value).length < 2)

        return error(form, field("contactName"), tr("errContact"));

    }

    const mobile = normalizeQatarNumber(field("mobile").value);

    if (!mobile) return error(form, field("mobile"), tr("errMobile"));

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(field("email").value)))

      return error(form, field("email"), tr("errEmail"));

    if (!field("consent").checked)

      return error(form, field("consent"), tr("errConsent"));

    field("mobile").value = mobile.slice(4);

    field("email").value = clean(field("email").value).toLowerCase();
    field("consent").value = "on";

    if (kind === "parent") {

      const children = [];

      for (const card of byId("kids-list").children) {

        const n = clean(card.querySelector('[data-child-field="name"]').value);

        const a = clean(card.querySelector('[data-child-field="age"]').value);

        const g = clean(

          card.querySelector('[data-child-field="gender"]').value,

        );

        if (!(n || a || g)) continue; // Optional opened but left completely blank.

        if (!(n && a && g)) {

          const incomplete = [...card.querySelectorAll("input,select")].find(

            (el) => !clean(el.value),

          );

          return error(

            form,

            incomplete,

            tr("errChild").replace("{n}", String(children.length + 1)),

          );

        }

        children.push({ name: n, age: a, gender: g });

      }

      byId("children-summary").value = JSON.stringify(children);

      byId("children-count").value = String(children.length);

      byId("access-priority").value = children.length ? "Priority" : "Standard";

    }

    return true;

  }

  const params = new URLSearchParams(location.search);

  for (const form of [byId("parent-form"), byId("academy-form")]) {

    form.elements.namedItem("source").value = location.pathname;

    form.elements.namedItem("utmSource").value = params.get("utm_source") || "";

    form.elements.namedItem("utmMedium").value = params.get("utm_medium") || "";

    form.elements.namedItem("utmCampaign").value =

      params.get("utm_campaign") || "";

    form.addEventListener("input", () => {

      form.querySelector(".form-error").textContent = "";

    });

  }



  async function send(form, kind) {

    if (!validate(form, kind)) return;

    const button = form.querySelector(".primary-button");

    const label = button.querySelector(".submit-label");

    button.disabled = true;

    label.textContent = tr("sending");

    try {

      // Netlify Forms requires a URL-encoded POST to a *static* route.

      // Keep the matching data-netlify HTML forms in index.html.

      const payload = new URLSearchParams(new FormData(form));

      const controller = new AbortController();

      const timeout = setTimeout(() => controller.abort(), 15000);

      let response;

      try {

        response = await fetch("/api/register", {

          method: "POST",

          headers: { "Content-Type": "application/x-www-form-urlencoded" },

          body: payload.toString(),

          signal: controller.signal,

        });

      } finally {

        clearTimeout(timeout);

      }

      if (!response.ok)

        throw Object.assign(new Error("Submit failed"), {

          status: response.status,

        });

      panels.parent.hidden = true;

      panels.academy.hidden = true;

      document.querySelector(".audience-switch").hidden = true;

      const success = byId("success-panel");

      byId("success-message").textContent = tr(

        kind === "parent" ? "parentSuccess" : "academySuccess",

      );

      success.hidden = false;

      success.scrollIntoView({ behavior: "smooth", block: "center" });

    } catch (err) {

      form.querySelector(".form-error").textContent =

        err.message && err.status && err.status !== 404 ? err.message : tr("errNetwork");

    } finally {

      button.disabled = false;

      label.textContent = tr(

        kind === "parent" ? "parentSubmit" : "academySubmit",

      );

    }

  }

  byId("parent-form").addEventListener("submit", (e) => {

    e.preventDefault();

    send(e.currentTarget, "parent");

  });

  byId("academy-form").addEventListener("submit", (e) => {

    e.preventDefault();

    send(e.currentTarget, "academy");

  });

  byId("start-again").addEventListener("click", () => {

    byId("parent-form").reset();

    byId("academy-form").reset();

    byId("kids-list").innerHTML = "";

    byId("kids-body").hidden = true;

    byId("kids-toggle").setAttribute("aria-expanded", "false");

    byId("academy-body").hidden = true;

    byId("academy-toggle").setAttribute("aria-expanded", "false");

    openTab("parent");

    applyLanguage(language, false);

    byId("parent-name").focus();

  });

  applyLanguage(language, false);

})();
