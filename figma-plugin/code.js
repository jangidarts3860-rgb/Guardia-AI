figma.showUI(__html__, {
  width: 440,
  height: 420,
  title: '🛡️ Guardia AI Screen Importer'
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
    return;
  }

  if (msg.type === 'create-screens') {
    const screens = msg.screens;

    const COLS = 4;
    const W = 390;
    const H = 844;
    const GAP = 80;
    const LABEL_H = 28;
    const PAD = 60;

    // Load font for labels
    try {
      await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    } catch (e) {
      await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });
    }

    const page = figma.currentPage;
    page.name = '🛡️ Guardia AI';

    // Dark container frame
    const rows = Math.ceil(screens.length / COLS);
    const containerW = COLS * W + (COLS - 1) * GAP + PAD * 2;
    const containerH = rows * (H + LABEL_H + GAP) - GAP + PAD * 2;

    const container = figma.createFrame();
    container.name = '🛡️ Guardia AI — All Screens';
    container.resize(containerW, containerH);
    container.fills = [{ type: 'SOLID', color: { r: 0.008, g: 0.027, b: 0.078 } }];
    container.cornerRadius = 32;
    container.x = 0;
    container.y = 0;
    page.appendChild(container);

    // Title text at top
    const title = figma.createText();
    try { title.fontName = { family: 'Inter', style: 'Medium' }; }
    catch (e) { title.fontName = { family: 'Roboto', style: 'Medium' }; }
    title.characters = '🛡️  Guardia AI  —  UI Screen Library';
    title.fontSize = 22;
    title.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.85, b: 1 } }];
    title.x = PAD;
    title.y = 20;
    container.appendChild(title);

    for (let i = 0; i < screens.length; i++) {
      const screen = screens[i];
      const col = i % COLS;
      const row = Math.floor(i / COLS);

      const x = PAD + col * (W + GAP);
      const y = PAD + 30 + row * (H + LABEL_H + GAP);

      // Convert array back to Uint8Array and create Figma image
      const imageData = new Uint8Array(screen.data);
      const image = figma.createImage(imageData);

      // Create the screen frame
      const frame = figma.createFrame();
      frame.name = screen.name;
      frame.resize(W, H);
      frame.x = x;
      frame.y = y;
      frame.clipsContent = true;
      frame.cornerRadius = 0;

      // Set screenshot as image fill
      frame.fills = [{
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL',
        opacity: 1
      }];

      // Drop shadow for premium look
      frame.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0.5, b: 0.85, a: 0.15 },
        offset: { x: 0, y: 16 },
        radius: 48,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }];

      container.appendChild(frame);

      // Label below each screen
      const label = figma.createText();
      try { label.fontName = { family: 'Inter', style: 'Medium' }; }
      catch (e) { label.fontName = { family: 'Roboto', style: 'Medium' }; }
      label.characters = `${String(i + 1).padStart(2, '0')}. ${screen.name}`;
      label.fontSize = 12;
      label.fills = [{ type: 'SOLID', color: { r: 0.45, g: 0.55, b: 0.65 } }];
      label.x = x;
      label.y = y + H + 10;
      label.resize(W, 18);
      container.appendChild(label);

      // Report progress back to UI
      figma.ui.postMessage({
        type: 'progress',
        current: i + 1,
        total: screens.length,
        name: screen.name
      });
    }

    // Zoom to fit everything
    figma.viewport.scrollAndZoomIntoView([container]);

    figma.closePlugin(`✅ Created ${screens.length} Guardia AI screens!`);
  }
};
