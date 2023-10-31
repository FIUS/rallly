"use client";

import { useTranslation } from "@/app/i18n/client";

export function Language() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Language</h1>
      <p>{t("accessAllFeatures")}</p>
    </div>
  );
}
