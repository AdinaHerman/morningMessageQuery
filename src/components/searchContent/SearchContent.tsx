import { DatePicker } from "@igds/react/date-picker";
import { Dropdown } from "@igds/react/dropdown";
import { Input } from "@igds/react/input";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import './SearchContent.scss'


function SearchContent({ searchParams, setSearchParams }) {
    const { t } = useTranslation();
    const [recipientTypeList, setRecipientTypeList] = useState([]);
    const [messageTypeList, setMessageTypeList] = useState([]);
    useEffect(() => {
        const loadOptions = async () => {
            try {
                const getTableUrl = "/shaarolami/CustomspilotWeb/SystemTables/api/GetTableData?tableName=";
                const RecipientRes = await fetch(getTableUrl + "MorningMessageRecepient");
                const recipientData = await RecipientRes.json();
                const recipientMapData = recipientData.map(item => ({
                    id: item.ID,
                    label: item.Name
                }));
                setRecipientTypeList(recipientMapData);

                const MessageRes = await fetch(getTableUrl + "MorningMessageType");
                const messageData = await MessageRes.json();
                const messageMapData = messageData.map(item => ({
                    id: item.ID,
                    label: item.Name
                }));
                setMessageTypeList(messageMapData);
            } catch (e) {
                console.error(e);
            }
        };

        loadOptions();
    }, []);


    const handleChange = (e) => {
        if (e.target.name === "fromDate" || e.target.name === "toDate") {
            setSearchParams({
                ...searchParams,
                [e.target.name]: new Date(e.target.value),
            });
        } else {
            setSearchParams({
                ...searchParams,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <>
            <div className="container">
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
                    value={searchParams.recipientType}
                    name="recipientType"
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
        </>
    );
}
export default SearchContent;