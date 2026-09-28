const interfaceText = {
  zh: {
    skip: "跳转到主要内容",
    "site.university": "南昌大学",
    "nav.about": "简介", "nav.publications": "论文",
    "nav.projects": "项目", "nav.students": "团队", "nav.recruitment": "招生",
    "nav.news": "动态", "nav.teaching": "教学",
    "profile.alt": "陈志威个人照片",
    "hero.intro": "研究方向包括计算机视觉、弱监督视觉感知与多模态学习。",
    "profile.admissions": "硕士研究生、本科生招生与科研指导 →",
    "recruitment.intro": "欢迎对计算机视觉与人工智能研究感兴趣的同学联系。",
    "recruitment.emailHint": "来信可简要介绍研究兴趣，并附上简历。",
    "news.more": "查看全部动态 →", "news.less": "收起动态 ↑",
    "projects.pi": "主持", "projects.active": "在研",
    "footer.updated": "更新于", "footer.top": "返回顶部 ↑",
  },
  en: {
    skip: "Skip to content",
    "site.university": "Nanchang University",
    "nav.about": "About", "nav.publications": "Publications",
    "nav.projects": "Projects", "nav.students": "People", "nav.recruitment": "Students",
    "nav.news": "News", "nav.teaching": "Teaching",
    "profile.alt": "Portrait of Zhiwei Chen",
    "hero.intro": "My research interests include computer vision, weakly supervised visual perception, and multimodal learning.",
    "profile.admissions": "Master’s and undergraduate research opportunities →",
    "recruitment.intro": "Students interested in computer vision and artificial intelligence are welcome to get in touch.",
    "recruitment.emailHint": "Please include a short description of your interests and your CV.",
    "news.more": "View all updates →", "news.less": "Show fewer ↑",
    "projects.pi": "Principal Investigator", "projects.active": "Active",
    "footer.updated": "Updated", "footer.top": "Back to top ↑",
  },
};

const languageSwitch = document.querySelector("#language-switch");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const newsToggle = document.querySelector("#news-toggle");
let currentLanguage = "zh";
let showAllNews = false;
const expandedStudentGroups = new Set();
const studentPreviewLimit = 6;
const bilingual = (value) => value?.[currentLanguage] ?? value?.en ?? "";
const setText = (selector, value) => { const node = document.querySelector(selector); if (node) node.textContent = value; };

function renderProfile() {
  const profile = window.siteContent.profile;
  setText("#brand-name", bilingual(profile.name));
  document.querySelector(".brand").setAttribute("aria-label", currentLanguage === "zh" ? "陈志威 — 首页" : "Zhiwei Chen — Home");
  setText("#profile-name", bilingual(profile.name));
  setText("#profile-name-en", currentLanguage === "zh" ? profile.name.en : profile.name.zh);
  setText("#footer-name", bilingual(profile.name));
  setText("#profile-title", bilingual(profile.title));
  setText("#profile-unit", bilingual(profile.unit));
  setText("#profile-degree", bilingual(profile.degree));
  const email = document.querySelector("#profile-email");
  email.textContent = profile.email;
  document.querySelector("#profile-email").href = `mailto:${profile.email}`;
  document.querySelector("#scholar-link").href = profile.scholar;
  document.querySelector("#publication-scholar").href = profile.scholar;
  document.querySelector("#github-link").href = profile.github;
}

function renderAbout() {
  const about = window.siteContent.about;
  setText("#about-title", bilingual(about.title));
  document.querySelector("#about-content").innerHTML = about.paragraphs.map((paragraph) => `<p>${bilingual(paragraph)}</p>`).join("");
}

function renderRecruitment() {
  const recruitment = window.siteContent.recruitment;
  setText("#recruitment-eyebrow", bilingual(recruitment.eyebrow));
  setText("#recruitment-title", bilingual(recruitment.title));
  document.querySelector("#recruitment-link").innerHTML = `${bilingual(recruitment.contact)} <span aria-hidden="true">↗</span>`;
  document.querySelector("#recruitment-link").href = `mailto:${window.siteContent.profile.email}?subject=${encodeURIComponent(currentLanguage === "zh" ? "咨询加入研究团队" : "Research opportunity inquiry")}`;
  document.querySelector("#recruitment-details").innerHTML = recruitment.details.map((item) => `<div><dt>${bilingual(item.label)}</dt><dd>${bilingual(item.value)}</dd></div>`).join("");
}

function renderNews() {
  const news = window.siteContent.news;
  setText("#news-title", bilingual(news.title));
  document.querySelector("#news-list").innerHTML = news.items.map((item, index) => `<li${!showAllNews && index >= 7 ? ' class="is-hidden"' : ""}><time>${item.date}</time><span>${bilingual(item)}</span></li>`).join("");
  newsToggle.setAttribute("aria-expanded", String(showAllNews));
  newsToggle.textContent = interfaceText[currentLanguage][showAllNews ? "news.less" : "news.more"];
  newsToggle.hidden = news.items.length <= 3;
}

function renderPublications() {
  const publications = window.siteContent.publications;
  setText("#publications-title", bilingual(publications.title));
  document.querySelector("#publication-list").innerHTML = [...publications.items].sort((a, b) => Number(b.year) - Number(a.year)).map((paper) => `<li><div class="paper-body"><p class="paper-title">${paper.title}</p><p class="paper-authors">${paper.authors}</p><p class="venue">${paper.venue} · ${paper.shortVenue}</p></div><div class="paper-meta"><span class="paper-year">${paper.year}</span><span class="paper-tag">${paper.level}</span></div></li>`).join("");
}

function renderProjects() {
  const projects = window.siteContent.projects;
  setText("#projects-title", bilingual(projects.title));
  document.querySelector("#project-list").innerHTML = projects.items.map((project) => `<li><time>${project.period}</time><div class="project-content"><strong>${bilingual(project.name)}</strong><p class="project-meta"><span>${interfaceText[currentLanguage]["projects.pi"]} · ${interfaceText[currentLanguage]["projects.active"]}</span><span>${bilingual(project.amount)}</span></p></div></li>`).join("");
}

function renderStudentCard(student) {
  const name = bilingual(student.name);
  const initials = name.split(/\s+/).map((part) => part.charAt(0)).join("").slice(0,2).toUpperCase();
  const photo = student.photo ? `<img class="student-photo" src="${student.photo}" alt="${name}" loading="lazy" />` : `<div class="student-photo student-photo-placeholder" aria-hidden="true">${initials}</div>`;
  const nameMarkup = student.url ? `<a href="${student.url}" target="_blank" rel="noopener noreferrer">${name}</a>` : name;
  const emailMarkup = student.email ? `<a href="mailto:${student.email}">${student.email}</a>` : "—";
  return `<article class="student-card">${photo}<div class="student-card-body"><h4>${nameMarkup}</h4><p class="student-level">${bilingual(student.level)}</p><dl><div><dd>${bilingual(student.research)}</dd></div><div><dd>${emailMarkup}</dd></div></dl></div></article>`;
}
function renderStudents() {
  const students = window.siteContent.students;
  setText("#students-title", bilingual(students.title));
  document.querySelector("#student-groups").innerHTML = students.groups
    .filter((group) => group.students.length)
    .map((group) => {
      const expanded = expandedStudentGroups.has(group.key);
      const visibleStudents = expanded ? group.students : group.students.slice(0, studentPreviewLimit);
      const count = currentLanguage === "zh"
        ? `${group.students.length} 人`
        : `${group.students.length} ${group.students.length === 1 ? "member" : "members"}`;
      const toggle = group.students.length > studentPreviewLimit
        ? `<button class="student-toggle" type="button" data-group-toggle="${group.key}" aria-controls="student-grid-${group.key}" aria-expanded="${expanded}">${expanded ? (currentLanguage === "zh" ? "收起 ↑" : "Show fewer ↑") : (currentLanguage === "zh" ? `查看全部 ${group.students.length} 位成员 →` : `View all ${group.students.length} members →`)}</button>`
        : "";
      return `<section class="student-group"><h3>${bilingual(group.title)}<span class="student-count">${count}</span></h3><div class="student-grid" id="student-grid-${group.key}">${visibleStudents.map(renderStudentCard).join("")}</div>${toggle}</section>`;
    })
    .join("");
}
function renderTeaching() {
  const teaching = window.siteContent.teaching;
  setText("#teaching-title", bilingual(teaching.title));
  document.querySelector("#teaching-list").innerHTML = teaching.items.map((course) => `<li>${bilingual(course)}</li>`).join("");
}
function renderUpdatedDate() {
  const value = window.siteContent.site.lastUpdated;
  const date = new Date(`${value}T00:00:00`);
  const element = document.querySelector("#last-updated");
  element.dateTime = value;
  element.textContent = new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {year:"numeric",month:"long",day:"numeric"}).format(date);
}
function setLanguage(language) {
  currentLanguage = interfaceText[language] ? language : "zh";
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = currentLanguage === "zh" ? "陈志威 | 学术主页" : "Zhiwei Chen | Academic Homepage";
  document.querySelector('meta[name="description"]').content = currentLanguage === "zh" ? "陈志威，南昌大学人工智能学院特聘研究员、硕士研究生导师。研究方向包括计算机视觉、弱监督视觉感知、多模态学习。" : "Zhiwei Chen is a Research Fellow and master’s supervisor at Nanchang University, working on computer vision, weakly supervised perception and multimodal learning.";
  document.querySelectorAll("[data-i18n]").forEach((element) => { const value = interfaceText[currentLanguage][element.dataset.i18n]; if (value) { element.textContent = value; } });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => { const value = interfaceText[currentLanguage][element.dataset.i18nAlt]; if (value) element.alt = value; });
  languageSwitch.textContent = currentLanguage === "zh" ? "English" : "中文";
  languageSwitch.setAttribute("aria-label", currentLanguage === "zh" ? "Switch to English" : "切换到中文");
  menuToggle.setAttribute("aria-label", mobileNav.hidden ? (currentLanguage === "zh" ? "打开菜单" : "Open menu") : (currentLanguage === "zh" ? "关闭菜单" : "Close menu"));
  renderProfile();renderAbout();renderRecruitment();renderNews();renderPublications();renderProjects();renderStudents();renderTeaching();renderUpdatedDate();
}
function closeMenu() { mobileNav.hidden = true; menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", currentLanguage === "zh" ? "打开菜单" : "Open menu"); }
languageSwitch.addEventListener("click", () => setLanguage(currentLanguage === "zh" ? "en" : "zh"));
menuToggle.addEventListener("click", () => { const open = mobileNav.hidden; mobileNav.hidden = !open; menuToggle.setAttribute("aria-expanded", String(open)); menuToggle.setAttribute("aria-label", open ? (currentLanguage === "zh" ? "关闭菜单" : "Close menu") : (currentLanguage === "zh" ? "打开菜单" : "Open menu")); });
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
newsToggle.addEventListener("click", () => { showAllNews = !showAllNews; renderNews(); });
document.querySelector("#student-groups").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-group-toggle]");
  if (!button) return;
  const group = button.dataset.groupToggle;
  if (expandedStudentGroups.has(group)) expandedStudentGroups.delete(group);
  else expandedStudentGroups.add(group);
  renderStudents();
  document.querySelector(`[data-group-toggle="${group}"]`)?.focus();
});
document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage("zh");
