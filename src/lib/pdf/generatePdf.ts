export async function generatePdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const html2pdf = (await import("html2pdf.js")).default;

  const opt = {
    margin: 0,
    filename,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] as const },
  };

  await html2pdf().set(opt).from(element).save();
}
