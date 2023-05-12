import { FC } from "react";

interface ITrangleProps {
    isActive?: boolean
};

const TriangleIcon: FC<ITrangleProps> = ({ isActive = false }) => {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '.3s ease',
        transform: isActive ? 'rotate(180deg)' : 'none'
    };

    return (
        <div className="triangle" style={style}>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.06668 6.56634L0.600016 3.09967C0.177794 2.67745 0.0835717 2.19434 0.317349 1.65034C0.551127 1.10634 0.967572 0.833897 1.56668 0.833008H8.43335C9.03335 0.833008 9.45024 1.10545 9.68402 1.65034C9.91779 2.19523 9.82313 2.67834 9.40002 3.09967L5.93335 6.56634C5.80002 6.69968 5.65557 6.79967 5.50002 6.86634C5.34446 6.93301 5.17779 6.96634 5.00002 6.96634C4.82224 6.96634 4.65557 6.93301 4.50002 6.86634C4.34446 6.79967 4.20002 6.69968 4.06668 6.56634Z" fill="#3D3D3D"/>
            </svg>
        </div>
        
    )
}

export default TriangleIcon;