const accessCookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1* 60 * 1000
};

const refreshCookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
};

export { accessCookieOptions, refreshCookieOptions };