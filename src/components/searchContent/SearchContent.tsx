import { useEffect, useState } from "react";
import { useTranslation } from 'multi-channel-core';
import { DatePicker, Dropdown, Input } from "@igds/react";
import { useSystemTableApiRequest } from "multi-channel-core";
import type { SearchParamsType, OriginalEntityType, DropdownOptionType } from '../../types/apiTypes';
import style from './SearchContent.module.scss'

interface SearchContentProps {
    searchParams: SearchParamsType;
    setSearchParams: (param: SearchParamsType) => void;
}

const SearchContent = (props: SearchContentProps) => {
    const { searchParams, setSearchParams } = props;
    const { t } = useTranslation();
    const [recipientTypeList, setRecipientTypeList] = useState([]);
    const [messageTypeList, setMessageTypeList] = useState([]);
    const { response: recipientResponse } = useSystemTableApiRequest({
        tableName: 'MorningMessageRecepient',
    });
    const { response: morningMessageTypeResponse } = useSystemTableApiRequest({
        tableName: 'MorningMessageType',
    });

    useEffect(() => {
        if (recipientResponse.data) {
            const recipientMapData = recipientResponse.data.map((item: OriginalEntityType) => ({
                id: item.ID,
                label: item.Name
            })).sort((a: DropdownOptionType, b: DropdownOptionType) => a.label.localeCompare(b.label));
            setRecipientTypeList(recipientMapData);
        }
    }, [recipientResponse.data]);

    useEffect(() => {
        if (morningMessageTypeResponse.data) {
            const messageMapData = morningMessageTypeResponse.data.map((item: OriginalEntityType) => ({
                id: item.ID,
                label: item.Name
            })).filter((item: DropdownOptionType) => item.label !== t('dailyTip'));
            setMessageTypeList(messageMapData);
        }
    }, [morningMessageTypeResponse.data]);


    const handleChange = (e) => {
        const { name, value, options, selectedIndex } = e.target;
        let parsedValue = value;

        if (name === "fromDate" || name === "toDate") {
            parsedValue = new Date(value);
        } else if (name === "recipientType" || name === "messageType") {
            parsedValue = options[selectedIndex].text;
        }

        setSearchParams({
            ...searchParams,
            [name]: parsedValue,
        });
    };

    return (
        <div className={style.container}>
            <DatePicker
                name="fromDate"
                value={searchParams.fromDate.toLocaleDateString('en-GB')}
                label={t('fromDate')}
                onChange={handleChange}
            />
            <DatePicker
                name="toDate"
                value={searchParams.toDate.toLocaleDateString('en-GB')}
                label={t('toDate')}
                onChange={handleChange}
            />
            <Input
                label={t('textInHeader')}
                value={searchParams.textInHeader}
                name="textInHeader"
                onChange={handleChange}
            />
            <Input
                label={t('textInBody')}
                value={searchParams.textInBody}
                name="textInBody"
                onChange={handleChange}
            />
            <Dropdown
                label={t('recipientType')}
                name="recipientType"
                value={searchParams.recipientType}
                options={recipientTypeList}
                onChange={handleChange}
            />
            <Dropdown
                label={t('messageType')}
                value={searchParams.messageType}
                name="messageType"
                options={messageTypeList}
                onChange={handleChange}
            />
        </div>
    );
};



export default SearchContent;