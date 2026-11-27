# Multi-Trailer Planning · Supplementary Experiments

A bilingual companion website for **Sparse Multiple-Shooting Path Integral Planning for Online Obstacle Avoidance of Multi-Trailer Vehicles**.

The page presents 11 videos: a complete field recording, six static simulation scenarios, two dynamic-obstacle maneuvers using currently visible obstacle points, and inner-corner experiments with three and four passive trailers.

The simulation clips replay recorded vehicle states at 1× simulation time, with a 2-second final still. They preserve the recorded motion and pauses; playback time is not the planner's wall-clock computation time. The field recording combines camera footage with onboard visualization and is shown at 2× speed. Its three chapter links refer to 00:06 (static obstacle), 00:22 (turning), and 00:48 (moving obstacle) in this accelerated video. The browser player starts at its normal 1× setting because acceleration is already encoded in the file.

## Preview

Open `index.html` directly, or serve this directory:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8080`. The site requires no build step or external services. Use `?lang=zh` or `?lang=en` to choose a language in a shared link.

## 更新视频

1. 将 MP4 视频放入 `assets/videos/`。建议使用 H.264 编码，开启 fast start，单文件小于 100 MB。
2. 在 `media.json` 中找到相应场景，保持 `type` 为 `video`，并把 `src` 设为视频相对路径。
3. 设置视频实际时长 `duration_seconds`，并用 `playback_label_en` / `playback_label_zh` 标明原速或实际播放倍率。
4. 保留 `poster` 作为视频加载前的封面。上传更新后检查网页上的播放效果。

`type: "image"` 显示静态轨迹总览，`type: "video"` 显示视频。英文和中文标题、说明均可在 `media.json` 中修改。网站通过 HTTP(S) 访问时会读取此文件；直接双击打开时使用 `app.js` 内置内容。

## GitHub Pages

In the repository, select **Settings → Pages → Deploy from a branch → main → /(root)**. All asset paths are relative, so the same files work on a project Pages URL.

Only website files and presentation media belong in this repository. Research archives and raw experiment logs are maintained separately.

Public website: https://mrafu.github.io/multi-trailer-planning/
