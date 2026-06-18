const interfaceText = {
  en: {
    skip: "Skip to content",
    "site.university": "Nanchang University",
    "site.school": "School of Artificial Intelligence",
    "nav.about": "About",
    "nav.recruitment": "Join Us",
    "nav.news": "News",
    "nav.publications": "Publications",
    "nav.projects": "Projects",
    "nav.students": "Students",
    "nav.teaching": "Teaching",
    "profile.alt": "Portrait of Zhiwei Chen",
    "profile.emailLabel": "Email",
    "profile.degreeLabel": "Degree",
    "profile.linksLabel": "Profiles",
    "projects.pi": "Principal Investigator",
    "projects.active": "Active",
    "footer.updated": "Last updated",
    "footer.top": "Back to top ↑",
  },
  zh: {
    skip: "跳转到主要内容",
    "site.university": "南昌大学",
    "site.school": "人工智能学院",
    "nav.about": "个人简介",
    "nav.recruitment": "招生信息",
    "nav.news": "近期动态",
    "nav.publications": "科研论文",
    "nav.projects": "科研项目",
    "nav.students": "指导学生",
    "nav.teaching": "教学课程",
    "profile.alt": "陈志威个人照片",
    "profile.emailLabel": "邮箱",
    "profile.degreeLabel": "学位",
    "profile.linksLabel": "学术主页",
    "projects.pi": "主持",
    "projects.active": "在研",
    "footer.updated": "最后更新",
    "footer.top": "返回顶部 ↑",
  },
};

const languageSwitch = document.querySelector("#language-switch");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
let currentLanguage = "en";

function bilingual(value) {
  return value?.[currentLanguage] ?? value?.en ?? "";
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function renderProfile() {
  const profile = window.siteContent.profile;
  setText("#profile-name", bilingual(profile.name));
  setText("#footer-name", bilingual(profile.name));
  setText("#profile-title", bilingual(profile.title));
  setText("#profile-unit", bilingual(profile.unit));
  setText("#profile-degree", bilingual(profile.degree));

  const email = document.querySelector("#profile-email");
  email.textContent = profile.email;
  email.href = `mailto:${profile.email}`;
  document.querySelector("#scholar-link").href = profile.scholar;
  document.querySelector("#github-link").href = profile.github;
}

function renderAbout() {
  const about = window.siteContent.about;
  setText("#about-title", bilingual(about.title));
  document.querySelector("#about-content").innerHTML = about.paragraphs
    .map((paragraph) => `<p>${bilingual(paragraph)}</p>`)
    .join("");
}

function renderRecruitment() {
  const recruitment = window.siteContent.recruitment;
  setText("#recruitment-eyebrow", bilingual(recruitment.eyebrow));
  setText("#recruitment-title", bilingual(recruitment.title));
  setText("#recruitment-link", bilingual(recruitment.contact));
  document.querySelector("#recruitment-details").innerHTML = recruitment.details
    .map((item) => `
      <div>
        <dt>${bilingual(item.label)}</dt>
        <dd>${bilingual(item.value)}</dd>
      </div>`)
    .join("");
  document.querySelector("#recruitment-link").href =
    `mailto:${window.siteContent.profile.email}`;
}

function renderNews() {
  const news = window.siteContent.news;
  setText("#news-title", bilingual(news.title));
  document.querySelector("#news-list").innerHTML = news.items
    .map((item) => `<li><time>${item.date}</time><span>${item[currentLanguage]}</span></li>`)
    .join("");
}

function renderPublications() {
  const publications = window.siteContent.publications;
  setText("#publications-title", bilingual(publications.title));
  document.querySelector("#publication-list").innerHTML = publications.items
    .map((paper) => `
      <li>
        <p class="paper-title">${paper.title}</p>
        <p>${paper.authors}</p>
        <p class="venue"><em>${paper.venue}</em> (<b>${paper.shortVenue}</b>), ${paper.year}. <span>${paper.level}</span></p>
      </li>`)
    .join("");
}

function renderProjects() {
  const projects = window.siteContent.projects;
  const pi = interfaceText[currentLanguage]["projects.pi"];
  const active = interfaceText[currentLanguage]["projects.active"];
  setText("#projects-title", bilingual(projects.title));
  document.querySelector("#project-list").innerHTML = projects.items
    .map((project) => `
      <li>
        <time>${project.period}</time>
        <div>
          <strong>${bilingual(project.name)}</strong>
          <span>${pi} · ${bilingual(project.amount)} · ${active}</span>
        </div>
      </li>`)
    .join("");
}

function renderStudents() {
  const students = window.siteContent.students;
  setText("#students-title", bilingual(students.title));

  document.querySelector("#student-list").innerHTML = students.items
    .map((student) => {
      const name = bilingual(student.name);
      const nameMarkup = student.url
        ? `<a href="${student.url}" target="_blank" rel="noopener noreferrer">${name}</a>`
        : `<span>${name}</span>`;
      return `
        <li>
          <strong>${nameMarkup}</strong>
          <span>${bilingual(student.level)} · ${bilingual(student.research)} · ${bilingual(student.cohort)}</span>
        </li>`;
    })
    .join("");
}

function renderTeaching() {
  const teaching = window.siteContent.teaching;
  setText("#teaching-title", bilingual(teaching.title));
  document.querySelector("#teaching-list").innerHTML = teaching.items
    .map((course) => `<li>${bilingual(course)}</li>`)
    .join("");
}

function renderUpdatedDate() {
  const value = window.siteContent.site.lastUpdated;
  const date = new Date(`${value}T00:00:00`);
  const element = document.querySelector("#last-updated");
  element.dateTime = value;
  element.textContent = new Intl.DateTimeFormat(
    currentLanguage === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(date);
}

function renderContent() {
  renderProfile();
  renderAbout();
  renderRecruitment();
  renderNews();
  renderPublications();
  renderProjects();
  renderStudents();
  renderTeaching();
  renderUpdatedDate();
}

function setLanguage(language) {
  currentLanguage = interfaceText[language] ? language : "en";
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = currentLanguage === "zh"
    ? "陈志威 | 个人学术主页"
    : "Zhiwei Chen | Academic Homepage";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = interfaceText[currentLanguage][element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = interfaceText[currentLanguage][element.dataset.i18nAlt];
    if (value) element.alt = value;
  });

  languageSwitch.textContent = currentLanguage === "en" ? "中文" : "EN";
  languageSwitch.setAttribute(
    "aria-label",
    currentLanguage === "en" ? "切换到中文" : "Switch to English",
  );
  menuToggle.setAttribute(
    "aria-label",
    menuToggle.getAttribute("aria-expanded") === "true"
      ? currentLanguage === "zh" ? "关闭菜单" : "Close menu"
      : currentLanguage === "zh" ? "打开菜单" : "Open menu",
  );
  renderContent();
}

function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    currentLanguage === "zh" ? "打开菜单" : "Open menu",
  );
}

languageSwitch.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "zh" : "en");
});

menuToggle.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open
      ? currentLanguage === "zh" ? "关闭菜单" : "Close menu"
      : currentLanguage === "zh" ? "打开菜单" : "Open menu",
  );
});

mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#year").textContent = new Date().getFullYear();

// The public website always opens in English.
setLanguage("en");
