export function getCookie(name) {
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.split("=").slice(1).join("="));
}

export function setCookie(name, value, days = 7) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function deleteCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0; SameSite=Lax`;
}