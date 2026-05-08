export function escapeLatex(text: string): string {
  if (!text) return "";

  // Process backslash FIRST to avoid double-escaping
  let result = text.replace(/\\/g, "\\textbackslash{}");

  result = result.replace(/&/g, "\\&");
  result = result.replace(/%/g, "\\%");
  result = result.replace(/\$/g, "\\$");
  result = result.replace(/#/g, "\\#");
  result = result.replace(/_/g, "\\_");
  result = result.replace(/\{/g, "\\{");
  result = result.replace(/\}/g, "\\}");
  result = result.replace(/~/g, "\\textasciitilde{}");
  result = result.replace(/\^/g, "\\textasciicircum{}");

  return result;
}
