import { FC } from "react";
import { useFormik } from "formik";

import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { selectProjects, togglePropertyFilter, resetFilters } from "../screens/main/projects/projectsSlice";
import { selectUserPreferences } from "@/components/userPreferences/userPreferencesSlice";
import Triangle from "@/components/ui/_icons/TriangleIcon";
import Cross from "@/components/ui/_icons/CrossIcon";
import { currencyData } from "@/utillis/preferenceData";

import styles from "./projectFilterSection.module.scss";

interface IAreaInputs {
    minArea: string,
    maxArea: string
};

interface ICostInputs {
    minCost: string,
    maxCost: string
};

const ProjectFilterSection: FC = () => {
    const dispatch = useTypedDispatch();
	const { filters } = useTypedSelector(selectProjects);
	const { currency } = useTypedSelector(selectUserPreferences);

    const formikArea = useFormik({
        initialValues: {
            minArea: '',
            maxArea: ''
        },
        onSubmit: (values: IAreaInputs) => {
            handleAreaSubmit(values);
        }
    });

    const formikCost = useFormik({
        initialValues: {
            minCost: '',
            maxCost: ''
        },
        onSubmit: (values: ICostInputs) => {
            handleCostSubmit(values);
        }
    });

    const handleAreaSubmit = (values: IAreaInputs) => {
        const min = Number(values.minArea);
        const max = Number(values.maxArea);
        
        if (min && max) {
            dispatch(togglePropertyFilter({'totalArea': [min, max]}))
        }
        
    };

    const handleCostSubmit = (values: ICostInputs) => {
        const min = Number(values.minCost);
        const max = Number(values.maxCost);
        
        if (min && max) {
            dispatch(togglePropertyFilter({'cost': [min, max]}))
        }
        
    };

    const changeFilter = (type: string, value: string | number | null): void => {
        dispatch(togglePropertyFilter({[type]: value}))
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filters__left}>
                <div
                    className={`${styles.filters__left_button} 
                    ${filters.floorNumber ? styles.activeButton : ""}`}
                >
                    <p>
                        Floors
                        {filters.floorNumber
                            ? `: ${filters.floorNumber}`
                            : ""}
                    </p>
                    {!filters.floorNumber ? (
                        <Triangle />
                    ) : (
                        <div className={ styles.filters__left_button_close}
                            onClick={() => changeFilter('floorNumber', null)}
                        >
                            <Cross />
                        </div>
                    )}

                    <div className={ styles.filters__left_button_popup}>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 1)}
                        >
                            1 floor
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 2)}
                        >
                            2 floors
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('floorNumber', 3)}
                        >
                            3 floors
                        </p>
                    </div>
                </div>
                
                <form onSubmit={formikArea.handleSubmit}
                    className={`${styles.filters__left_button} 
                    ${filters.totalArea ? styles.activeButton : ""}`}
                >
                    <p>
                        Area
                        {filters.totalArea
                            ? `: ${filters.totalArea[0]} - ${filters.totalArea[1]}`
                            : ""}
                    </p>
                    {!filters.totalArea ? (
                        <Triangle />
                    ) : (
                        <div className={styles.filters__left_button_close}
                            onClick={() => changeFilter('totalArea', null)}
                        >
                            <Cross />
                        </div>
                    )}
                    <div className={styles.filters__left_button_popup}>
                        <div className={styles.filters__left_button_popup_input}>
                            <p>minimum</p>
                            <div>
                                <input value={formikArea.values.minArea} onChange={formikArea.handleChange} type="number" name="minArea" id="minArea" placeholder="100" />
                                <p>m</p>
                            </div>
                        </div>

                        <div className={styles.filters__left_button_popup_input}>
                            <p>maximum</p>
                            <div>
                                <input value={formikArea.values.maxArea} onChange={formikArea.handleChange} type="number" name="maxArea" id="maxArea" placeholder="3000" />
                                <p>m</p>
                            </div>
                        </div>
                        <button type="submit">Apply</button>
                    </div>
                </form>

                <div
                    className={`${styles.filters__left_button} 
                    ${filters.roofType ? styles.activeButton : ""}`}
                >
                    <p>
                        Roof
                        {filters.roofType
                            ? `: ${filters.roofType}`
                            : ""}
                    </p>
                    {!filters.roofType ? (
                        <Triangle />
                    ) : (
                        <div className={ styles.filters__left_button_close}
                            onClick={() => changeFilter('roofType', null)}
                        >
                            <Cross />
                        </div>
                    )}

                    <div className={styles.filters__left_button_popup}>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Flat')}
                        >
                            Flat
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Pitched')}
                        >
                            Pitched
                        </p>
                        <p
                            id={styles.filterOption}
                            onClick={() => changeFilter('roofType', 'Mixed')}
                        >
                            Mixed
                        </p>
                    </div>
                </div>

                <form onSubmit={formikCost.handleSubmit}
                    className={`${styles.filters__left_button} 
                    ${filters.cost ? styles.activeButton : ""}`}
                >
                    <p>
                        Cost
                        {filters.cost
                            ? `: ${filters.cost[0]} - ${filters.cost[1]}${currencyData[currency]}`
                            : ""}
                    </p>
                    {!filters.cost ? (
                        <Triangle />
                    ) : (
                        <div className={styles.filters__left_button_close}
                            onClick={() => changeFilter('cost', null)}
                        >
                            <Cross />
                        </div>
                    )}
                    <div className={styles.filters__left_button_popup}>
                        <div className={styles.filters__left_button_popup_input }>
                            <p>minimum</p>
                            <div>
                                <input value={formikCost.values.minCost} onChange={formikCost.handleChange} type="number" name="minCost" id="minCost" placeholder="10" />
                                <p>{currencyData[currency]}</p>
                            </div>
                        </div>

                        <div className={styles.filters__left_button_popup_input } >
                            <p>maximum</p>
                            <div>
                                <input value={formikCost.values.maxCost} onChange={formikCost.handleChange} type="number" name="maxCost" id="maxCost" placeholder="1000" />
                                <p>{currencyData[currency]}</p>
                            </div>
                        </div>
                        <button type="submit">Apply</button>
                    </div>
                </form>
                
            </div>
            <div className={styles.filters__right}>
                <p onClick={() => dispatch(resetFilters())}>
                    Reset filters
                </p>
                <div>Filter</div>
            </div>
        </div>
    )
}

export default ProjectFilterSection;