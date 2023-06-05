import { FC } from "react";
import vars from '@/styles/_variables.module.scss';

interface IProps {
    hasFilling?: boolean
};

const WarningIcon: FC<IProps> = ({ hasFilling = false }) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={hasFilling ? vars.additionalColor : 'none'} xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10V6M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM10 14H10.01V14.01H10V14Z" stroke={hasFilling ? vars.secondaryColor : vars.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default WarningIcon;