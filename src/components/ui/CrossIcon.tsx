import { FC } from "react";

const CrossIcon: FC = () => {

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={style}>
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.00006 6.91407L9.53539 10.4501C9.72299 10.6377 9.97743 10.7431 10.2427 10.7431C10.508 10.7431 10.7625 10.6377 10.9501 10.4501C11.1377 10.2625 11.243 10.008 11.243 9.74274C11.243 9.47744 11.1377 9.223 10.9501 9.03541L7.41339 5.50007L10.9494 1.96474C11.0422 1.87185 11.1159 1.76159 11.1661 1.64024C11.2163 1.51889 11.2422 1.38884 11.2421 1.2575C11.2421 1.12617 11.2162 0.99613 11.1659 0.874806C11.1156 0.753482 11.042 0.643251 10.9491 0.550407C10.8562 0.457562 10.7459 0.383923 10.6246 0.333692C10.5032 0.283462 10.3732 0.257624 10.2418 0.257655C10.1105 0.257686 9.98045 0.283585 9.85913 0.333872C9.7378 0.38416 9.62757 0.457852 9.53473 0.55074L6.00006 4.08607L2.46473 0.55074C2.37253 0.455188 2.26222 0.378954 2.14024 0.326488C2.01826 0.274023 1.88705 0.246375 1.75427 0.245159C1.6215 0.243943 1.48981 0.269183 1.36689 0.319406C1.24397 0.369629 1.13228 0.443829 1.03834 0.537677C0.944407 0.631525 0.870102 0.743142 0.819763 0.866014C0.769424 0.988886 0.74406 1.12055 0.745151 1.25333C0.746242 1.38611 0.773765 1.51734 0.826116 1.63937C0.878467 1.7614 0.954596 1.87178 1.05006 1.96407L4.58673 5.50007L1.05073 9.03541C0.863132 9.223 0.757741 9.47744 0.757741 9.74274C0.757741 10.008 0.863132 10.2625 1.05073 10.4501C1.23832 10.6377 1.49276 10.7431 1.75806 10.7431C2.02336 10.7431 2.2778 10.6377 2.46539 10.4501L6.00006 6.91341V6.91407Z" fill="#3D3D3D"/>
            </svg>
        </div>
    )
}

export default CrossIcon;