import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
    messages: { [x: string]: string };
    locale: string;
}
export default function StaticPage(props: Props) {
    return (
        <>
            <div>{props.locale}</div>
            <pre>{JSON.stringify(props.messages, null, 2)}</pre>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    locale: "pt",
                },
            },
            {
                params: {
                    locale: "es",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.params?.locale;
    return {
        props: {
            messages: isLocale(locale) && messages[locale],
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
