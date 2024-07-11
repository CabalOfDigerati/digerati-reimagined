import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { staggerTextOnHover } from "$digerati/staggerTextOnHover";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  staggerTextOnHover();
});