import { createInstance, Namespace } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { useParams } from "next/navigation";
import { initReactI18next } from "react-i18next/initReactI18next";

import { defaultNS, getOptions } from "./i18n/settings";

const initI18next = async (lng: string, ns: Namespace) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(ns: Namespace = defaultNS) {
  const params = useParams<{ locale: string }>();
  const i18nextInstance = await initI18next(params.locale, ns);
  return {
    t: i18nextInstance.getFixedT(params.locale, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
