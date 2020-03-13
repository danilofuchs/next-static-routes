export interface Props {
    article: string;
}
export default function HelpArticlesPage(props: Props) {
    return (
        <>
            <div>Ajuda os artigos!</div>
            <div>{props.article}</div>
        </>
    );
}
