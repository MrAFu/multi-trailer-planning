(() => {
  "use strict";

  const strings = {
    en: {
      documentTitle: "Multi-Trailer Planning · Experiments",
      skip: "Skip to experiments", brand: "Multi-trailer planning", navigation: "Experiments",
      navReal: "Real-world", navScenarios: "Six scenarios", navExtensions: "More trailers",
      eyebrow: "Supplementary experiments",
      paperTitle: "Sparse Multiple-Shooting Path Integral Planning for Online Obstacle Avoidance of Multi-Trailer Vehicles",
      heroDescription: "Real-world video and simulation results of whole-vehicle passage in constrained spaces: obstacle avoidance, six simulated tasks, and longer trailer combinations.",
      multipleShooting: "Sparse multiple shooting", watchExperiments: "Explore the experiments",
      realHeading: "Real-world obstacle avoidance",
      realDescription: "A tractor with two following bodies navigates static obstacles, turns, and a change in the obstacle layout.",
      fullRecording: "Full experiment", momentsHeading: "Three moments to explore",
      momentsDescription: "Select a moment to play it in the full recording.",
      chapterStatic: "Static obstacle", chapterStaticDescription: "Passing the fixed green stand.",
      chapterTurn: "Turning", chapterTurnDescription: "Coordinating the following bodies around the blue bin.",
      chapterDynamic: "Moving obstacle", chapterDynamicDescription: "Continuing passage after the red bin is moved.",
      chapterNote: "Times refer to the field recording.",
      scenariosHeading: "Six simulated scenarios",
      scenariosDescription: "Complementary tasks examine turning, passage through narrow openings, and the final configuration of the complete vehicle.",
      extensionsHeading: "Longer vehicle combinations",
      extensionsDescription: "Inner-corner experiments with three and four passive trailers examine configuration coordination as the vehicle combination grows.",
      loading: "Loading video…",
      videoError: "This video could not be loaded. Try again or download the file below.",
      imageError: "This figure could not be loaded. Try again or open the image below.",
      retry: "Try again", download: "Download video", viewImage: "View image", trajectoryOverview: "Trajectory overview", repository: "GitHub repository",
      footer: "Supplementary experiments"
    },
    zh: {
      documentTitle: "多级铰接车辆规划 · 实验展示",
      skip: "跳至实验内容", brand: "多级铰接车辆规划", navigation: "实验导航",
      navReal: "实车实验", navScenarios: "六类场景", navExtensions: "挂车扩展",
      eyebrow: "论文补充实验",
      paperTitle: "面向多级铰接车辆在线避障的稀疏多重打靶路径积分规划",
      heroDescription: "通过实车视频与仿真轨迹展示受限空间中的整车通行，包括避障、六类仿真任务，以及更长车组的挂车扩展实验。",
      multipleShooting: "稀疏多重打靶", watchExperiments: "查看实验",
      realHeading: "实车避障实验",
      realDescription: "一辆牵引车与两个后续车体，在静态障碍、转弯和局部障碍布局变化中协调通行。",
      fullRecording: "完整实验", momentsHeading: "三个关键时刻",
      momentsDescription: "点击下方时刻，跳转至完整视频的对应位置。",
      chapterStatic: "静态绕障", chapterStaticDescription: "绕行固定的绿色台架。",
      chapterTurn: "转弯通行", chapterTurnDescription: "协调后续车体绕过蓝色桶体。",
      chapterDynamic: "移动障碍", chapterDynamicDescription: "红色桶体被移动后继续通行。",
      chapterNote: "时间对应现场拍摄视频。",
      scenariosHeading: "六类仿真场景",
      scenariosDescription: "通过互补的场景，考察转弯、狭窄开口通行，以及完整车组的终端构型。",
      extensionsHeading: "更多级挂车的车组扩展",
      extensionsDescription: "一拖三与一拖四的内切弯实验，考察车组增长后的构型协调与通行。",
      loading: "正在加载视频…",
      videoError: "视频暂时无法加载，请重试或使用下方链接下载。",
      imageError: "图片暂时无法加载，请重试或使用下方链接查看。",
      retry: "重新加载", download: "下载视频", viewImage: "查看大图", trajectoryOverview: "轨迹总览", repository: "GitHub 仓库",
      footer: "论文补充实验"
    }
  };

  // These records also make the page usable when opened directly with file://.
  // A served media.json overrides individual fields without changing the layout.
  const defaults = [
    ["real-world", "Real-world obstacle avoidance", "实车避障实验", "Static obstacles, turning, and a moving obstacle in a field experiment.", "现场实验中的静态绕障、转弯与移动障碍通行。", 115.25],
    ["sim-inner-corner", "Inner corner", "内切弯", "Preparing the vehicle configuration for rear-trailer off-tracking through a tight turn.", "提前调整车组构型，为狭窄转弯中的后续挂车内切留出空间。"],
    ["sim-narrow-gap-turn", "Narrow-gap turn", "窄缝转弯", "Coupling steering with complete-vehicle passage through a constricted opening.", "在转向过程中协调完整车组通过狭窄开口。"],
    ["sim-s-corridor", "S-shaped corridor", "S 形通道", "Coordinating all vehicle bodies along successive changes in corridor direction.", "沿连续变化的通道方向协调各级车体运动。"],
    ["sim-oblique-gap", "Oblique narrow gap", "斜窄缝", "Aligning the vehicle bodies with inclined passage boundaries.", "协调各车体姿态与倾斜通道边界之间的几何匹配。"],
    ["sim-l-parking", "L-shaped forward parking", "L 形前向泊入", "Completing a turn and aligning the tractor and trailers at the destination.", "完成转弯，并在目标位置协调牵引车与挂车的终端构型。"],
    ["sim-u-turn", "U-turn", "U 形转弯", "Managing the space occupied by the complete vehicle during a large direction change.", "在较大行进方向变化中协调完整车组的占用空间。"],
    ["extension-three-trailers", "Three trailers", "一拖三", "Inner-corner passage with one tractor and three passive trailers.", "一辆牵引车与三辆被动挂车的内切弯通行。"],
    ["extension-four-trailers", "Four trailers", "一拖四", "Inner-corner passage with one tractor and four passive trailers.", "一辆牵引车与四辆被动挂车的内切弯通行。"]
  ].map(([id, title_en, title_zh, description_en, description_zh, duration_seconds]) => ({
    id, title_en, title_zh, description_en, description_zh,
    type: id === "real-world" ? "video" : "image",
    src: id === "real-world" ? `assets/videos/${id}.mp4` : `assets/posters/${id}.jpg`, poster: `assets/posters/${id}.jpg`,
    duration_seconds: duration_seconds ?? null,
    playback_label_en: id === "real-world" ? "Original speed" : "Trajectory overview",
    playback_label_zh: id === "real-world" ? "原速" : "轨迹总览"
  }));

  const items = [...document.querySelectorAll(".media-item")];
  const boundMedia = new WeakSet();
  const languageButton = document.querySelector("#language-switch");
  const realVideo = document.querySelector("#real-world-video");
  let media = new Map(defaults.map(record => [record.id, record]));
  let language = "en";
  let pendingSeek = null;

  try {
    const requested = new URLSearchParams(location.search).get("lang");
    const remembered = localStorage.getItem("multi-trailer-language");
    language = requested === "zh" || requested === "en" ? requested : remembered === "zh" ? "zh" : "en";
  } catch (_) { /* Storage can be unavailable in private browsing or file previews. */ }

  function localized(record, field) {
    return record[`${field}_${language}`] || record[`${field}_en`] || "";
  }

  function assetURL(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["http:", "https:", "file:"].includes(url.protocol) ? value : null;
    } catch (_) { return null; }
  }

  function durationText(seconds) {
    const value = Number(seconds);
    if (!Number.isFinite(value) || value <= 0) return "";
    const whole = Math.round(value);
    const hours = Math.floor(whole / 3600);
    const minutes = Math.floor((whole % 3600) / 60);
    const remainder = String(whole % 60).padStart(2, "0");
    return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}` : `${minutes}:${remainder}`;
  }

  function renderMedia() {
    items.forEach(item => {
      const record = media.get(item.dataset.mediaId);
      if (!record) return;
      const isImage = record.type === "image";
      const shell = item.querySelector(".video-shell");
      shell.classList.toggle("image-shell", isImage);
      item.dataset.mediaType = isImage ? "image" : "video";
      const title = item.querySelector(".media-title");
      const description = item.querySelector(".media-description");
      if (title) title.textContent = localized(record, "title");
      if (description) description.textContent = localized(record, "description");
      item.querySelector(".playback-label").textContent = isImage ? strings[language].trajectoryOverview : localized(record, "playback_label");
      const duration = item.querySelector(".duration");
      duration.textContent = isImage ? "" : durationText(record.duration_seconds);
      duration.hidden = !duration.textContent;
      const errorText = shell.querySelector(".player-error p");
      errorText.dataset.i18n = isImage ? "imageError" : "videoError";
      errorText.textContent = strings[language][errorText.dataset.i18n];
      let src = assetURL(record.src);
      if (isImage && (!src || /\.(mp4|webm|mov)(?:[?#]|$)/i.test(src))) src = assetURL(record.poster);
      let visual = shell.querySelector("video, img");
      if (!visual || (visual.tagName === "IMG") !== isImage) {
        if (visual) {
          if (visual.tagName === "VIDEO") visual.pause();
          (visual.closest(".image-link") || visual).remove();
        }
        if (isImage) {
          const link = document.createElement("a");
          link.className = "image-link";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          visual = document.createElement("img");
          visual.className = "result-image";
          visual.loading = "lazy";
          visual.decoding = "async";
          link.append(visual);
          shell.prepend(link);
        } else {
          visual = document.createElement("video");
          visual.controls = true;
          visual.playsInline = true;
          visual.preload = "none";
          const source = document.createElement("source");
          source.type = "video/mp4";
          visual.append(source);
          shell.prepend(visual);
        }
      }
      bindVisual(visual);
      if (isImage) {
        visual.alt = localized(record, "title");
        const link = visual.closest(".image-link");
        link.setAttribute("aria-label", `${strings[language].viewImage}: ${localized(record, "title")}`);
        if (src) {
          link.href = src;
          if (visual.getAttribute("src") !== src) visual.src = src;
        } else {
          link.removeAttribute("href");
          showFailure(visual);
        }
      } else {
        visual.setAttribute("aria-label", localized(record, "title"));
        const source = visual.querySelector("source");
        if (src && source.getAttribute("src") !== src) {
          source.setAttribute("src", src);
          // A late configuration response must not interrupt playback.
          if (visual.paused && visual.currentTime === 0) visual.load();
        }
        const poster = assetURL(record.poster);
        if (poster) visual.setAttribute("poster", poster);
      }
      const download = item.querySelector(".download-link");
      download.hidden = !src;
      if (src) download.href = src;
      const linkText = download.querySelector("span");
      linkText.dataset.i18n = isImage ? "viewImage" : "download";
      linkText.textContent = strings[language][linkText.dataset.i18n];
      download.querySelector("span:last-child").textContent = isImage ? "↗" : "↓";
      download.toggleAttribute("download", !isImage);
      if (isImage) {
        download.target = "_blank";
        download.rel = "noopener noreferrer";
      } else download.removeAttribute("target");
      download.setAttribute("aria-label", `${linkText.textContent}: ${localized(record, "title")}`);
    });
  }

  function setLanguage(next) {
    language = next === "zh" ? "zh" : "en";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = strings[language].documentTitle;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const value = strings[language][element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(element => {
      const value = strings[language][element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });
    languageButton.textContent = language === "en" ? "中文" : "English";
    languageButton.setAttribute("aria-label", language === "en" ? "切换为中文" : "Switch to English");
    languageButton.setAttribute("aria-pressed", String(language === "zh"));
    renderMedia();
    try { localStorage.setItem("multi-trailer-language", language); } catch (_) { /* Optional preference. */ }
  }

  function showFailure(video) {
    const shell = video.closest(".video-shell");
    shell.querySelector(".player-loading").hidden = true;
    shell.querySelector(".player-error").hidden = false;
    if (video === realVideo) pendingSeek = null;
  }

  function showLoading(video, show) {
    const shell = video.closest(".video-shell");
    shell.querySelector(".player-loading").hidden = !show || !shell.querySelector(".player-error").hidden;
  }

  function playFromInteraction(video) {
    const result = video.play();
    if (result && typeof result.catch === "function") {
      result.catch(error => {
        // An interrupted request is normal when the user switches videos quickly.
        if (error.name !== "AbortError" && error.name !== "NotAllowedError") showFailure(video);
        else showLoading(video, false);
      });
    }
  }

  function bindVisual(video) {
    if (boundMedia.has(video)) return;
    boundMedia.add(video);
    const item = video.closest(".media-item");
    const errorPanel = item.querySelector(".player-error");
    if (video.tagName === "IMG") {
      video.addEventListener("load", () => { errorPanel.hidden = true; });
      video.addEventListener("error", () => showFailure(video));
      return;
    }
    video.addEventListener("play", () => {
      document.querySelectorAll("video").forEach(other => { if (other !== video) other.pause(); });
      errorPanel.hidden = true;
      if (video.readyState < 3) showLoading(video, true);
    });
    video.addEventListener("waiting", () => { if (!video.paused) showLoading(video, true); });
    video.addEventListener("playing", () => showLoading(video, false));
    video.addEventListener("pause", () => showLoading(video, false));
    video.addEventListener("ended", () => showLoading(video, false));
    video.addEventListener("error", () => showFailure(video));
    video.querySelector("source").addEventListener("error", () => showFailure(video));
    video.addEventListener("loadedmetadata", () => {
      const duration = item.querySelector(".duration");
      duration.textContent = durationText(video.duration);
      duration.hidden = !duration.textContent;
      if (video === realVideo && pendingSeek !== null) {
        video.currentTime = Math.min(pendingSeek, Math.max(0, video.duration - 0.1));
        pendingSeek = null;
      }
    });
  }

  items.forEach(item => {
    item.querySelector(".retry-button").addEventListener("click", () => {
      item.querySelector(".player-error").hidden = true;
      const visual = item.querySelector("video, img");
      if (visual.tagName === "IMG") {
        const src = visual.getAttribute("src");
        visual.removeAttribute("src");
        if (src) visual.src = src;
      } else {
        visual.load();
        playFromInteraction(visual);
      }
    });
  });

  document.querySelectorAll("[data-seek]").forEach(button => {
    button.addEventListener("click", () => {
      const seconds = Number(button.dataset.seek);
      if (!Number.isFinite(seconds)) return;
      realVideo.closest(".media-item").querySelector(".player-error").hidden = true;
      if (realVideo.readyState >= 1 && Number.isFinite(realVideo.duration)) {
        realVideo.currentTime = Math.min(seconds, Math.max(0, realVideo.duration - 0.1));
      } else {
        pendingSeek = seconds;
        realVideo.load();
      }
      playFromInteraction(realVideo);
    });
  });

  function setRepository(url) {
    const link = document.querySelector("#repository-link");
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" || parsed.hostname !== "github.com" || parsed.pathname.split("/").filter(Boolean).length < 2) return;
      link.href = parsed.href;
      link.hidden = false;
    } catch (_) { /* No repository is shown until a real URL is configured. */ }
  }

  function canonicalId(record) {
    if (media.has(record.id)) return record.id;
    for (const path of [record.src, record.poster]) {
      if (typeof path !== "string") continue;
      const basename = path.split(/[?#]/)[0].split("/").pop().replace(/\.(mp4|webm|mov|jpg|jpeg|png|webp|svg)$/i, "");
      if (media.has(basename)) return basename;
    }
    return null;
  }

  async function loadConfiguration() {
    if (location.protocol === "file:") return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch("./media.json", { signal: controller.signal, cache: "no-cache" });
      if (!response.ok) return;
      const config = await response.json();
      const records = Array.isArray(config) ? config : config.videos || config.media || config.items || [];
      if (Array.isArray(records)) records.forEach(record => {
        if (!record || typeof record !== "object") return;
        const id = canonicalId(record);
        if (id) media.set(id, { ...media.get(id), ...record, id });
      });
      if (!Array.isArray(config)) setRepository(config.repository_url || config.repositoryUrl);
      renderMedia();
    } catch (_) {
      // The built-in records remain useful offline or if metadata is unavailable.
    } finally { clearTimeout(timer); }
  }

  languageButton.addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
  setRepository(document.body.dataset.repositoryUrl);
  setLanguage(language);
  loadConfiguration();

  if ("IntersectionObserver" in window) {
    const navigationLinks = [...document.querySelectorAll(".main-nav a")];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navigationLinks.forEach(link => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.15, 0.4] });
    document.querySelectorAll(".experiment-section").forEach(section => observer.observe(section));
  }
})();
