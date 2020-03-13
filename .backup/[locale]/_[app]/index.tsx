import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
    messages: { [x: string]: string };
    locale: string;
    app: string;
}
export default function StaticPage(props: Props) {
    return (
        <>
            <div>{props.locale}</div>
            <div>{props.app}</div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    locale: "pt",
                    app: "aplicativo-de-rastreio",
                },
            },
            {
                params: {
                    locale: "es",
                    app: "app-de-rastreo-de-paquetes",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.params?.locale;
    const app = context.params?.app;
    return {
        props: {
            messages: isLocale(locale) && messages[locale],
            app,
        },
    };
};

const messages = {
    pt: {
        a: "oi",
    },
    es: {
        a: "Arriba!",
    },
};

type Locale = keyof typeof messages;

const isLocale = (locale: any): locale is Locale => {
    return locale in messages;
};
