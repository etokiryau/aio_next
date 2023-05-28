import { FC, PropsWithChildren } from "react";
import { IMeta } from "./meta.interface";
import Head from "next/head";

const Meta: FC<PropsWithChildren<IMeta>> = ({ title, description, children, autodesk }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                {description 
                    ? <>
                        <meta name='description' content={description} />
                        <meta name='og:title' content={title} />
                        <meta name='og:description' content={description} />
                    </> 
                    : <meta name='robots' content='noindex, nofollow' />
                }

                {autodesk && <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css" type="text/css"></link>}
            </Head>
            {children}
        </>
    )
}

export default Meta;