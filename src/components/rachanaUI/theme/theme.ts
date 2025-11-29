export type Theme="light"|"dark" |"system";

export function applyTheme(theme:Theme){
    if(theme==="system"){
        const prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark",prefersDark);
        return;
    }
    document.documentElement.classList.toggle("dark",theme==="dark");
}

export function initializeTheme(){
    const saved=localStorage.getItem("theme") as Theme | null;
    const theme=saved || "system";
    applyTheme(theme);
    return theme;
}
export function setTheme(theme:Theme){
    localStorage.setItem("theme",theme);
    applyTheme(theme);
}
