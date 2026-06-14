export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://canlabs.co";
}

export function getMailFrom() {
  return process.env.MAIL_FROM || "CanLabs <noreply@canlabs.co>";
}
