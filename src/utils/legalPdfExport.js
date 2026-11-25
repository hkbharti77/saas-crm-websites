import {
  INTEGRATION_FLOW_TABS,
  LEGAL_META,
  PLATFORM_DATA_INVENTORY,
  PRIVACY_SECTIONS,
  RETENTION_SCHEDULES,
  TELEMETRY_PROVIDERS,
  TERMS_SECTIONS,
} from '../config/legalDocumentsConfig';

const PAGE_WIDTH = 595.28; // A4 width in pt
const PAGE_HEIGHT = 841.89; // A4 height in pt
const MARGIN_X = 50;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 54;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

/**
 * Normalizes Unicode typography into clean WinAnsi-safe ASCII for built-in PDF Helvetica fonts.
 */
export function sanitizePdfText(input) {
  return String(input || '')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2014/g, ' -- ')
    .replace(/\u2013/g, '-')
    .replace(/\u00B7|\u2022/g, ' | ')
    .replace(/\u00A7/g, 'Sec. ')
    .replace(/\u20B9/g, 'INR ')
    .replace(/\u00A9/g, '(c)')
    .replace(/\u2192/g, '->')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapePdfLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Deterministic word wrapper using conservative Helvetica character-width estimation.
 */
function wrapLine(text, fontSize, isBold = false) {
  const clean = sanitizePdfText(text);
  if (!clean) return [];

  const avgCharWidth = fontSize * (isBold ? 0.56 : 0.52);
  const maxChars = Math.max(24, Math.floor(CONTENT_WIDTH / avgCharWidth));

  const words = clean.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      if (word.length > maxChars) {
        for (let i = 0; i < word.length; i += maxChars) {
          lines.push(word.slice(i, i + maxChars));
        }
      } else {
        current = word;
      }
      continue;
    }

    if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      if (word.length > maxChars) {
        for (let i = 0; i < word.length; i += maxChars) {
          lines.push(word.slice(i, i + maxChars));
        }
        current = '';
      } else {
        current = word;
      }
    }
  }

  if (current) lines.push(current);
  return lines;
}

/**
 * Builds structured blocks directly from the canonical legal config (used for complete
 * multi-tab export and deterministic unit testing without requiring a DOM).
 */
export function buildStructuredLegalBlocks(activeDocId) {
  const officer = LEGAL_META.grievanceOfficer;
  const blocks = [];

  if (activeDocId === 'privacy') {
    blocks.push({
      type: 'h2',
      text: 'Summary & Statutory Notice',
    });
    blocks.push({
      type: 'p',
      text: `This Privacy Policy explains how ${LEGAL_META.legalEntity} (${LEGAL_META.operatingModel}) handles personal data across ${LEGAL_META.websiteUrl}, Gyan VaniAi workspaces, and connected services in alignment with India's Digital Personal Data Protection Act, 2023 (DPDP Act), DPDP Rules, 2025, IT Act, 2000, and applicable GDPR requirements.`,
    });

    blocks.push({ type: 'h2', text: 'Chapters Covered' });
    for (const section of PRIVACY_SECTIONS) {
      blocks.push({
        type: 'li',
        text: `${section.number}. ${section.title} -- ${section.summary}`,
      });
    }

    blocks.push({
      type: 'h2',
      text: 'Verified Platform & Customer Data Inventory',
    });
    for (const group of PLATFORM_DATA_INVENTORY) {
      blocks.push({ type: 'h3', text: group.group });
      for (const row of group.rows) {
        blocks.push({
          type: 'li',
          text: `${row.category}: ${row.fields} Purpose: ${row.purpose} Lawful basis: ${row.basis}.`,
        });
      }
    }

    blocks.push({
      type: 'h2',
      text: 'Connected Services & Integration Data Flows (All Providers)',
    });
    for (const tab of INTEGRATION_FLOW_TABS) {
      blocks.push({ type: 'h3', text: `${tab.title} (${tab.eyebrow})` });
      blocks.push({ type: 'p', text: tab.intro });
      for (const flow of tab.flows) {
        blocks.push({ type: 'li', text: `${flow.name}: ${flow.detail}` });
      }
      blocks.push({
        type: 'p',
        text: `${tab.complianceNoteTitle}: ${tab.complianceNote}`,
      });
    }

    blocks.push({ type: 'h2', text: 'Website Telemetry & Measurement' });
    for (const t of TELEMETRY_PROVIDERS) {
      blocks.push({
        type: 'li',
        text: `${t.provider}: ${t.dataFlow} Storage: ${t.storage} Basis: ${t.basis}. ${t.revocation}`,
      });
    }

    blocks.push({ type: 'h2', text: 'Data Retention & Erasure Schedule' });
    for (const r of RETENTION_SCHEDULES) {
      blocks.push({
        type: 'li',
        text: `${r.classification} (${r.period}): ${r.action}`,
      });
    }
  } else {
    blocks.push({ type: 'h2', text: 'Binding Platform Agreement' });
    blocks.push({
      type: 'p',
      text: `These Terms of Service govern use of ${LEGAL_META.brandName}, operated by ${LEGAL_META.legalEntity} (${LEGAL_META.operatingModel}). Active production payment gateways: ${LEGAL_META.activePaymentGateways.join(', ')}.`,
    });

    for (const section of TERMS_SECTIONS) {
      blocks.push({
        type: 'h2',
        text: `${section.number}. ${section.title}`,
      });
      blocks.push({ type: 'p', text: section.summary });
    }
  }

  blocks.push({
    type: 'h2',
    text: 'Designated Grievance Redressal Officer & Electronic Contact',
  });
  blocks.push({
    type: 'li',
    text: `Officer: ${officer.name} (${officer.designation})`,
  });
  blocks.push({
    type: 'li',
    text: `Entity & Operating Mode: ${LEGAL_META.legalEntity} -- ${LEGAL_META.operatingModel}`,
  });
  blocks.push({
    type: 'li',
    text: `Official Correspondence: ${LEGAL_META.correspondenceMode}`,
  });
  blocks.push({
    type: 'li',
    text: `Email: ${officer.email} | Telephone: ${officer.phoneDisplay} (${officer.hours})`,
  });
  blocks.push({
    type: 'li',
    text: `SLAs: Acknowledgment ${officer.acknowledgmentSla}; Resolution target ${officer.resolutionSla}.`,
  });

  return blocks;
}

/**
 * Extracts rich blocks from the live rendered legal article DOM and appends complete
 * integration disclosures for /privacy so collapsed tabs are still included in the PDF.
 */
export function extractArticlePdfBlocks(articleElement, activeDocId) {
  if (!articleElement || typeof articleElement.querySelectorAll !== 'function') {
    return buildStructuredLegalBlocks(activeDocId);
  }

  const blocks = [];
  const sections = articleElement.querySelectorAll('.trust-ed-notice-box, .trust-ed-section');

  sections.forEach((sectionEl) => {
    if (sectionEl.classList.contains('trust-ed-notice-box')) {
      const title = sectionEl.querySelector('.trust-ed-notice-title')?.textContent;
      const body = sectionEl.querySelector('.trust-ed-notice-text')?.textContent;
      if (title) blocks.push({ type: 'h3', text: title });
      if (body) blocks.push({ type: 'p', text: body });
      return;
    }

    const sectionId = sectionEl.getAttribute('id') || '';
    const num = sectionEl.querySelector('.trust-ed-section-num')?.textContent;
    const h2 = sectionEl.querySelector('.trust-ed-h2')?.textContent;
    if (h2) {
      blocks.push({
        type: 'h2',
        text: num ? `${num} -- ${h2}` : h2,
      });
    }

    // For Chapter 03 (Integrations), export ALL 4 verified integration tabs rather than only the visible tab
    if (activeDocId === 'privacy' && sectionId === 'integrations') {
      const intro = sectionEl.querySelector(':scope > .trust-ed-prose')?.textContent;
      if (intro) blocks.push({ type: 'p', text: intro });

      for (const tab of INTEGRATION_FLOW_TABS) {
        blocks.push({ type: 'h3', text: `${tab.title} (${tab.eyebrow})` });
        blocks.push({ type: 'p', text: tab.intro });
        for (const flow of tab.flows) {
          blocks.push({ type: 'li', text: `${flow.name}: ${flow.detail}` });
        }
        blocks.push({
          type: 'p',
          text: `${tab.complianceNoteTitle}: ${tab.complianceNote}`,
        });
      }
      return;
    }

    // Walk direct and structured descendants inside the section (excluding interactive form inputs)
    const nodes = sectionEl.querySelectorAll(
      '.trust-ed-h3, .trust-ed-prose, .trust-ed-list > li, .trust-ed-surface-panel, .trust-ed-table tbody tr, .trust-ed-dossier-item'
    );

    nodes.forEach((node) => {
      if (node.closest('form')) return;

      if (node.classList.contains('trust-ed-h3')) {
        blocks.push({ type: 'h3', text: node.textContent });
      } else if (node.classList.contains('trust-ed-prose')) {
        blocks.push({ type: 'p', text: node.textContent });
      } else if (node.tagName === 'LI') {
        blocks.push({ type: 'li', text: node.textContent });
      } else if (node.classList.contains('trust-ed-surface-panel')) {
        const panelTitle = node.querySelector('.trust-ed-panel-title')?.textContent;
        const panelBody = node.querySelector('.trust-ed-panel-body')?.textContent;
        if (panelTitle) blocks.push({ type: 'h3', text: panelTitle });
        if (panelBody) blocks.push({ type: 'p', text: panelBody });
      } else if (node.tagName === 'TR') {
        const cells = Array.from(node.querySelectorAll('td'))
          .map((td) => sanitizePdfText(td.textContent))
          .filter(Boolean);
        if (cells.length > 0) {
          blocks.push({ type: 'li', text: cells.join(' | ') });
        }
      } else if (node.classList.contains('trust-ed-dossier-item')) {
        const label = node.querySelector('.trust-ed-dossier-label')?.textContent;
        const value = node.querySelector('.trust-ed-dossier-value')?.textContent;
        if (label && value) {
          blocks.push({ type: 'li', text: `${label}: ${value}` });
        }
      }
    });
  });

  return blocks.length > 0 ? blocks : buildStructuredLegalBlocks(activeDocId);
}

/**
 * Generates a standards-compliant, multi-page A4 PDF 1.4 binary (Uint8Array)
 * with exact byte-offset xref table and built-in Helvetica / Helvetica-Bold fonts.
 */
export function generatePdfBytes({ title, subtitle, metaLine, blocks }) {
  const pages = [];
  let currentOps = [];
  let cursorY = PAGE_HEIGHT - MARGIN_TOP;

  const pushPage = () => {
    if (currentOps.length > 0) {
      pages.push(currentOps);
      currentOps = [];
    }
    cursorY = PAGE_HEIGHT - MARGIN_TOP;
  };

  const ensureSpace = (neededHeight) => {
    if (cursorY - neededHeight < MARGIN_BOTTOM) {
      pushPage();
    }
  };

  const drawTextLine = (text, x, y, fontKey, fontSize, rgb = [0.06, 0.09, 0.16]) => {
    const escaped = escapePdfLiteral(text);
    currentOps.push(
      `${rgb[0].toFixed(2)} ${rgb[1].toFixed(2)} ${rgb[2].toFixed(2)} rg BT /${fontKey} ${fontSize} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escaped}) Tj ET`
    );
  };

  const drawRule = (y) => {
    currentOps.push(
      `0.82 0.85 0.89 RG 0.75 w ${MARGIN_X.toFixed(2)} ${y.toFixed(2)} m ${(PAGE_WIDTH - MARGIN_X).toFixed(2)} ${y.toFixed(2)} l S`
    );
  };

  // Document Masthead on Page 1
  drawTextLine(
    sanitizePdfText(`${LEGAL_META.brandName.toUpperCase()} TRUST CENTER`),
    MARGIN_X,
    cursorY,
    'F2',
    9,
    [0.06, 0.46, 0.43]
  );
  cursorY -= 22;

  for (const line of wrapLine(title, 20, true)) {
    drawTextLine(line, MARGIN_X, cursorY, 'F2', 20, [0.06, 0.09, 0.16]);
    cursorY -= 24;
  }

  if (subtitle) {
    cursorY -= 2;
    for (const line of wrapLine(subtitle, 10.5, false)) {
      drawTextLine(line, MARGIN_X, cursorY, 'F1', 10.5, [0.28, 0.33, 0.41]);
      cursorY -= 14.5;
    }
  }

  if (metaLine) {
    cursorY -= 4;
    for (const line of wrapLine(metaLine, 9, false)) {
      drawTextLine(line, MARGIN_X, cursorY, 'F1', 9, [0.39, 0.45, 0.55]);
      cursorY -= 13;
    }
  }

  cursorY -= 6;
  drawRule(cursorY);
  cursorY -= 18;

  // Render content blocks with clean pagination
  for (const block of blocks) {
    if (!block || !block.text) continue;

    if (block.type === 'h2') {
      const lines = wrapLine(block.text, 13, true);
      ensureSpace(lines.length * 18 + 22);
      cursorY -= 8;
      drawRule(cursorY + 12);
      for (const line of lines) {
        drawTextLine(line, MARGIN_X, cursorY, 'F2', 13, [0.06, 0.09, 0.16]);
        cursorY -= 17;
      }
      cursorY -= 3;
    } else if (block.type === 'h3') {
      const lines = wrapLine(block.text, 10.5, true);
      ensureSpace(lines.length * 14 + 14);
      cursorY -= 4;
      for (const line of lines) {
        drawTextLine(line, MARGIN_X, cursorY, 'F2', 10.5, [0.06, 0.46, 0.43]);
        cursorY -= 14;
      }
      cursorY -= 2;
    } else if (block.type === 'li') {
      const lines = wrapLine(block.text, 9.5, false);
      const blockHeight = lines.length * 13.5 + 5;
      ensureSpace(Math.min(blockHeight, 48));
      lines.forEach((line, idx) => {
        ensureSpace(15);
        const prefix = idx === 0 ? '- ' : '  ';
        drawTextLine(`${prefix}${line}`, MARGIN_X + 8, cursorY, 'F1', 9.5, [0.2, 0.25, 0.33]);
        cursorY -= 13.5;
      });
      cursorY -= 3;
    } else {
      const lines = wrapLine(block.text, 9.5, false);
      lines.forEach((line) => {
        ensureSpace(15);
        drawTextLine(line, MARGIN_X, cursorY, 'F1', 9.5, [0.2, 0.25, 0.33]);
        cursorY -= 13.5;
      });
      cursorY -= 6;
    }
  }

  pushPage();

  // Add consistent page footer to every page
  const totalPages = pages.length;
  const footerMeta = sanitizePdfText(
    `${LEGAL_META.legalEntity} | ${LEGAL_META.websiteUrl} | Effective ${LEGAL_META.effectiveDate}`
  );

  const pageStreams = pages.map((ops, index) => {
    const footerOps = [
      `0.82 0.85 0.89 RG 0.5 w ${MARGIN_X.toFixed(2)} 38.00 m ${(PAGE_WIDTH - MARGIN_X).toFixed(2)} 38.00 l S`,
      `0.40 0.45 0.54 rg BT /F1 8 Tf 1 0 0 1 ${MARGIN_X.toFixed(2)} 24.00 Tm (${escapePdfLiteral(footerMeta)}) Tj ET`,
      `0.40 0.45 0.54 rg BT /F1 8 Tf 1 0 0 1 ${(PAGE_WIDTH - MARGIN_X - 58).toFixed(2)} 24.00 Tm (Page ${index + 1} of ${totalPages}) Tj ET`,
    ];
    return [...ops, ...footerOps].join('\n');
  });

  // Assemble PDF objects:
  // 1: Catalog, 2: Pages, 3: Font F1 (Helvetica), 4: Font F2 (Helvetica-Bold),
  // then for each page i: (5 + 2*i) = Page object, (6 + 2*i) = Content stream
  const objects = [];
  const pageObjectIds = pageStreams.map((_, i) => 5 + i * 2);

  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>\nendobj\n`
  );
  objects.push(
    '3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n'
  );
  objects.push(
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n'
  );

  const encoder = new TextEncoder();

  pageStreams.forEach((stream, i) => {
    const pageObjId = 5 + i * 2;
    const contentObjId = 6 + i * 2;
    const streamBytes = encoder.encode(stream);

    objects.push(
      `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`
    );
    objects.push(
      `${contentObjId} 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n${stream}\nendstream\nendobj\n`
    );
  });

  // Build exact byte-offset xref table
  const parts = [];
  const headerBytes = encoder.encode('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  parts.push(headerBytes);

  let byteOffset = headerBytes.length;
  const offsets = [0];

  for (const objStr of objects) {
    offsets.push(byteOffset);
    const bytes = encoder.encode(objStr);
    parts.push(bytes);
    byteOffset += bytes.length;
  }

  const xrefStart = byteOffset;
  const xrefLines = [`xref\n0 ${offsets.length}\n`, '0000000000 65535 f \n'];
  for (let i = 1; i < offsets.length; i += 1) {
    xrefLines.push(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }
  xrefLines.push(
    `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`
  );

  parts.push(encoder.encode(xrefLines.join('')));

  const totalLength = parts.reduce((acc, part) => acc + part.length, 0);
  const output = new Uint8Array(totalLength);
  let pos = 0;
  for (const part of parts) {
    output.set(part, pos);
    pos += part.length;
  }

  return output;
}

export function getLegalPdfFilename(activeDocId) {
  return activeDocId === 'privacy'
    ? 'Gyan-VaniAi-Privacy-Policy.pdf'
    : 'Gyan-VaniAi-Terms-of-Service.pdf';
}

export function downloadLegalPdf({ activeDocId, title, deck, articleElement }) {
  const blocks = extractArticlePdfBlocks(articleElement, activeDocId);
  const metaLine = `Effective Date: ${LEGAL_META.effectiveDate} | ${LEGAL_META.legalEntity} | ${LEGAL_META.operatingModel}`;
  const pdfBytes = generatePdfBytes({
    title,
    subtitle: deck,
    metaLine,
    blocks,
  });

  const filename = getLegalPdfFilename(activeDocId);
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 5000);

  return filename;
}

/**
 * Triggers native browser print when available in a top-level browsing context,
 * and gracefully falls back to downloading a real PDF copy when embedded inside
 * a sandboxed iframe that blocks window.print().
 */
export function triggerPrintWithPdfFallback({
  activeDocId,
  title,
  deck,
  articleElement,
  onFallback,
}) {
  if (typeof window === 'undefined') return;

  let isEmbedded;
  try {
    isEmbedded = window.self !== window.top;
  } catch {
    isEmbedded = true;
  }

  if (isEmbedded || typeof window.print !== 'function') {
    const filename = downloadLegalPdf({
      activeDocId,
      title,
      deck,
      articleElement,
    });
    if (onFallback) onFallback(filename, 'iframe');
    return;
  }

  let printEventFired = false;
  const handleBeforePrint = () => {
    printEventFired = true;
  };

  window.addEventListener('beforeprint', handleBeforePrint, { once: true });

  try {
    window.print();
  } catch {
    window.removeEventListener('beforeprint', handleBeforePrint);
    const filename = downloadLegalPdf({
      activeDocId,
      title,
      deck,
      articleElement,
    });
    if (onFallback) onFallback(filename, 'blocked');
    return;
  }

  window.setTimeout(() => {
    window.removeEventListener('beforeprint', handleBeforePrint);
    if (!printEventFired) {
      const filename = downloadLegalPdf({
        activeDocId,
        title,
        deck,
        articleElement,
      });
      if (onFallback) onFallback(filename, 'blocked');
    }
  }, 180);
}
