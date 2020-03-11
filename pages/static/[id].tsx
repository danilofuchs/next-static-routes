import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
    static: string;
}
export default function StaticPage(props: Props) {
    console.log(props);
    return <div>This is static {props.static}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    id: "1",
                },
            },
            {
                params: {
                    id: "2",
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    console.log("generating");
    return {
        props: {
            static: context.params?.id,
        },
    };
};
