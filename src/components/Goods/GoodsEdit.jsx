import React from "react";

import myDataProfider from "../.././myDataProvider";

import {
    Edit,
    SimpleForm,
    FormDataConsumer,
    TextInput,
    SelectInput,
    BooleanInput,
    SelectArrayInput,
    ImageInput,
    ArrayInput,
    SimpleFormIterator,
    required,
} from "react-admin";

import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

import {DateTimeInput} from "react-admin-date-inputs2";

import {defaultStyle, arrayInputStyle} from "../../style";

import {PreviewImage} from ".././";

const GoodsEdit = (props) => {
    const [categories, setCategories] = React.useState([]);
    const [timetype, setTimetype] = React.useState([]);
    const [teachers, setTeachers] = React.useState([]);
    const [teachersSection, setTeachersSection] = React.useState([]);
    const [type, setType] = React.useState([]);
    const [goods, setGoods] = React.useState([]);
    const [selectedDate, handleDateChange] = React.useState(new Date());

    React.useEffect(() => {
        myDataProfider
            .getList("categories", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setCategories(data);
            });

        myDataProfider
            .getList("goodsTimetype", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setTimetype(data);
            });
        myDataProfider
            .getList("teachers", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setTeachers(data);
            });
        myDataProfider
            .getList("teachers", {
                pagination: {page: 1},
                sort: {order: "ASC"},
                filter: {main: true},
            })
            .then(({data}) => {
                setTeachersSection(data);
            });
        myDataProfider
            .getList("goodsType", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setType(data);
            });
        myDataProfider
            .getList("goods", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setGoods(data);
            });
    }, []);

    const blocks = [
        {title: "Главная 1", key: "main1"},
        {title: "Главная 2", key: "main2"},
        {title: "Квадраты", key: "section-squares"},
        {title: "Слайдер с текстом", key: "slider-text"},
        {title: "Состав продукта", key: "composition-product"},
        {title: "Преподаватели", key: "teachers"},
        {title: "Отзывы (фото)", key: "feedback-photos"},
        {title: "Отзывы (видео)", key: "feedback-videos"},
        {title: "Товары", key: "goods"},
    ];

    return (
        <Edit {...props} title="Редактировать товар">
            <SimpleForm>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                    <TextInput
                        source="id_awo"
                        label="ID товара на АвтоВебОфис"
                        type="number"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                    <TextInput
                        source="title"
                        label="Название товара"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                    <BooleanInput
                        label="Дорогой ли товар?"
                        source="expensive"
                    />
                    <FormDataConsumer>
                        {({formData}) =>
                            formData.expensive && (
                                <TextInput
                                    source="href"
                                    label="Ссылка на лендинг страницу"
                                    validate={[required()]}
                                    style={defaultStyle}
                                />
                            )
                        }
                    </FormDataConsumer>
                    {categories.length ? (
                        <SelectInput
                            label="Категория"
                            source="category"
                            choices={categories}
                            optionValue="key"
                            optionText="title"
                            validate={[required()]}
                            style={defaultStyle}
                        />
                    ) : null}
                    {type.length ? (
                        <SelectInput
                            label="Тип"
                            source="type"
                            choices={type}
                            optionValue="key"
                            optionText="title"
                            validate={[required()]}
                            style={defaultStyle}
                        />
                    ) : null}
                    <TextInput
                        source="time"
                        label="Время прохождения"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                    {timetype.length ? (
                        <SelectInput
                            label="Тип времени"
                            source="timeType"
                            choices={timetype}
                            optionValue="key"
                            optionText="title"
                            validate={[required()]}
                            style={defaultStyle}
                        />
                    ) : null}
                    {teachers.length ? (
                        <SelectArrayInput
                            label="Автор"
                            validate={[required()]}
                            source="auth"
                            choices={teachers}
                            style={defaultStyle}
                        />
                    ) : null}
                    <TextInput
                        source="searchTags"
                        label="Теги для поиска"
                        validate={[required()]}
                        style={defaultStyle}
                        multiline
                    />
                    <BooleanInput
                        label="Добавлять в главную секцию"
                        source="section"
                        style={defaultStyle}
                    />
                    <BooleanInput label="Скидка на товар" source="salebool" />
                    <FormDataConsumer>
                        {({formData}) =>
                            formData.salebool && (
                                <>
                                    <TextInput
                                        source="sale"
                                        label="Сумма скидки"
                                        type="number"
                                        validate={[required()]}
                                        style={defaultStyle}
                                    />
                                </>
                            )
                        }
                    </FormDataConsumer>
                    <TextInput
                        source="price"
                        label="Полная цена со скидкой или полная цена"
                        type="number"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                    <FormDataConsumer>
                        {({formData}) =>
                            formData.salebool && (
                                <TextInput
                                    source="priceOld"
                                    label="Цена без скидки"
                                    type="number"
                                    validate={[required()]}
                                    style={defaultStyle}
                                />
                            )
                        }
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({formData}) =>
                            formData.expensive && (
                                <TextInput
                                    source="expensiveText"
                                    label="Текст в цене у дорого товара"
                                    validate={[required()]}
                                    style={defaultStyle}
                                />
                            )
                        }
                    </FormDataConsumer>
                    <BooleanInput label="Виден ли товар?" source="visibility" />
                    <ImageInput
                        source="thumb"
                        label="Изображение (максимальный размер 2МБ)"
                        maxSize="2000000"
                        accept="image/*"
                        placeholder={<p>Перетащите файл сюда</p>}
                        style={defaultStyle}
                    >
                        <PreviewImage source="src" />
                    </ImageInput>

                    <TextInput
                        label="Произвольный JavaScript код"
                        source="shopPageJs"
                        style={defaultStyle}
                        multiline
                    />
                    <TextInput
                        label="Теги HTML"
                        source="shopPageHtml"
                        style={defaultStyle}
                        multiline
                    />

                    <div style={{display: "flex"}}>
                        <p
                            style={{
                                fontSize: "18px",
                                fontFamily: "sans-serif",
                                paddingTop: "7px",
                                paddingRight: "15px",
                                color: "#ccc",
                            }}
                        >
                            http://iomp.ru/shop/pages/
                        </p>

                        <TextInput
                            source="url"
                            label="Ссылка на Лендинг страницу"
                            style={defaultStyle}
                        />
                    </div>

                    <ArrayInput
                        source="page"
                        label="Лендинг товара"
                        style={defaultStyle}
                    >
                        <SimpleFormIterator>
                            <SelectInput
                                label="Блок"
                                validate={[required()]}
                                source="type"
                                choices={blocks}
                                style={defaultStyle}
                                optionText="title"
                                optionValue="key"
                            />

                            <FormDataConsumer>
                                {({scopedFormData, getSource}) =>
                                    scopedFormData ? (
                                        <>
                                            {scopedFormData.type === "main1" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "subtitle"
                                                        )}
                                                        label="Надзаголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Оффер"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "description"
                                                        )}
                                                        label="Описание"
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "btnText"
                                                        )}
                                                        label="Кнопка"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                </>
                                            ) : null}

                                            {scopedFormData.type === "main2" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "subtitle"
                                                        )}
                                                        label="Надзаголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Оффер"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "description"
                                                        )}
                                                        label="Описание"
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "main2_id_awo"
                                                        )}
                                                        label="ID группы на АвтоВебОфис"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "action"
                                                        )}
                                                        label="Введите значения атрибута 'action' в теге '<form>'"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "formId"
                                                        )}
                                                        label="Введите значения атрибута 'value' в теге '<input>' с 'name=formId'"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <TextInput
                                                        source={getSource(
                                                            "formVc"
                                                        )}
                                                        label="Введите значения атрибута 'value' в теге '<input>' с 'name=formVc'"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <BooleanInput
                                                        label="Авто"
                                                        source={getSource(
                                                            "auto"
                                                        )}
                                                        style={defaultStyle}
                                                    />
                                                    {scopedFormData.auto && (
                                                        <TextInput
                                                            source={getSource(
                                                                "day"
                                                            )}
                                                            label="На сколько дней продлевается мероприятие"
                                                            validate={[
                                                                required(),
                                                            ]}
                                                            style={
                                                                arrayInputStyle
                                                            }
                                                            type="number"
                                                        />
                                                    )}
                                                    <BooleanInput
                                                        label="Диапазон"
                                                        source={getSource(
                                                            "range"
                                                        )}
                                                        style={arrayInputStyle}
                                                    />
                                                    {scopedFormData.range ? (
                                                        <>
                                                            <DateTimeInput
                                                                options={{
                                                                    inputVariant:
                                                                        "outlined",
                                                                    format:
                                                                        "yyyy-MM-dd, HH:mm",
                                                                }}
                                                                source={getSource(
                                                                    "minDate"
                                                                )}
                                                                value={
                                                                    selectedDate
                                                                }
                                                                onChange={
                                                                    handleDateChange
                                                                }
                                                                label="С"
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                            <DateTimeInput
                                                                options={{
                                                                    inputVariant:
                                                                        "outlined",
                                                                    format:
                                                                        "yyyy-MM-dd, HH:mm",
                                                                }}
                                                                source={getSource(
                                                                    "maxDate"
                                                                )}
                                                                value={
                                                                    selectedDate
                                                                }
                                                                onChange={
                                                                    handleDateChange
                                                                }
                                                                label="До"
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <DateTimeInput
                                                            options={{
                                                                inputVariant:
                                                                    "outlined",
                                                                format:
                                                                    "yyyy-MM-dd, HH:mm",
                                                                clearable: true,
                                                            }}
                                                            source={getSource(
                                                                "date"
                                                            )}
                                                            value={selectedDate}
                                                            onChange={
                                                                handleDateChange
                                                            }
                                                            label="Дата и время проведения"
                                                            style={
                                                                arrayInputStyle
                                                            }
                                                        />
                                                    )}
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "section-squares" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />

                                                    <ArrayInput
                                                        source={getSource(
                                                            "squares"
                                                        )}
                                                        label="Блоки"
                                                        style={arrayInputStyle}
                                                        validate={[required()]}
                                                    >
                                                        <SimpleFormIterator>
                                                            <SelectInput
                                                                label="Размер"
                                                                source="type"
                                                                choices={[
                                                                    {
                                                                        key:
                                                                            "small",
                                                                        title:
                                                                            "Маленький",
                                                                    },
                                                                    {
                                                                        key:
                                                                            "big",
                                                                        title:
                                                                            "Большой",
                                                                    },
                                                                ]}
                                                                optionValue="key"
                                                                optionText="title"
                                                                style={
                                                                    defaultStyle
                                                                }
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                            />
                                                            <TextInput
                                                                source="title"
                                                                label="Заголовок блока"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source="description"
                                                                label="Описание блока"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "slider-text" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <ArrayInput
                                                        source={getSource(
                                                            "tabs"
                                                        )}
                                                        label="Табы"
                                                        style={arrayInputStyle}
                                                        validate={[required()]}
                                                    >
                                                        <SimpleFormIterator>
                                                            <TextInput
                                                                source="title"
                                                                label="Заголовок таба"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />
                                                            <ArrayInput
                                                                source="items"
                                                                label="Пункты"
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                            >
                                                                <SimpleFormIterator>
                                                                    <TextInput
                                                                        source="text"
                                                                        label="Текст"
                                                                        validate={[
                                                                            required(),
                                                                        ]}
                                                                        style={
                                                                            arrayInputStyle
                                                                        }
                                                                    />
                                                                </SimpleFormIterator>
                                                            </ArrayInput>
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                    <TextInput
                                                        source={getSource(
                                                            "btnText"
                                                        )}
                                                        label="Кнопка"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "composition-product" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    <ArrayInput
                                                        source={getSource(
                                                            "modules"
                                                        )}
                                                        label="Модули"
                                                        style={arrayInputStyle}
                                                        validate={[required()]}
                                                    >
                                                        <SimpleFormIterator>
                                                            <TextInput
                                                                source="title"
                                                                label="Заголовок"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source="description"
                                                                label="Описание"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                                multiline
                                                            />
                                                            {goods.length ? (
                                                                <SelectInput
                                                                    label="Товар модуля"
                                                                    validate={[
                                                                        required(),
                                                                    ]}
                                                                    optionText="title"
                                                                    optionValue="id"
                                                                    source="goodModule"
                                                                    choices={
                                                                        goods
                                                                    }
                                                                    style={
                                                                        arrayInputStyle
                                                                    }
                                                                />
                                                            ) : null}

                                                            <BooleanInput
                                                                label="Акция"
                                                                source="stockBoolean"
                                                            />

                                                            {goods.length ? (
                                                                <SelectInput
                                                                    label="Товар акции"
                                                                    optionText="title"
                                                                    optionValue="id"
                                                                    source="goodModuleStock"
                                                                    choices={
                                                                        goods
                                                                    }
                                                                    style={
                                                                        arrayInputStyle
                                                                    }
                                                                />
                                                            ) : null}
                                                            <TextInput
                                                                source="titleStock"
                                                                label="Заголовок"
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />

                                                            <TextInput
                                                                source="descriptionStock"
                                                                label="Описание"
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source="btnTextStock"
                                                                label="Кнопка"
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            />

                                                            <ArrayInput
                                                                source="items"
                                                                label="Список"
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                            >
                                                                <SimpleFormIterator>
                                                                    <TextInput
                                                                        source="title"
                                                                        label="Заголовок"
                                                                        validate={[
                                                                            required(),
                                                                        ]}
                                                                        style={
                                                                            arrayInputStyle
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        source="description"
                                                                        label="Описание"
                                                                        validate={[
                                                                            required(),
                                                                        ]}
                                                                        style={
                                                                            arrayInputStyle
                                                                        }
                                                                        multiline
                                                                    />
                                                                </SimpleFormIterator>
                                                            </ArrayInput>
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                    <BooleanInput
                                                        label="Форма"
                                                        source={getSource(
                                                            "formBoolean"
                                                        )}
                                                    />
                                                    {scopedFormData.formBoolean ? (
                                                        <>
                                                            <TextInput
                                                                source={getSource(
                                                                    "form_id_awo"
                                                                )}
                                                                label="ID группы на АвтоВебОфис"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source={getSource(
                                                                    "action"
                                                                )}
                                                                label="Введите значения атрибута 'action' в теге '<form>'"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source={getSource(
                                                                    "formId"
                                                                )}
                                                                label="Введите значения атрибута 'value' в теге '<input>' с 'name=formId'"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                            <TextInput
                                                                source={getSource(
                                                                    "formVc"
                                                                )}
                                                                label="Введите значения атрибута 'value' в теге '<input>' с 'name=formVc'"
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                style={
                                                                    defaultStyle
                                                                }
                                                            />
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "teachers" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    {teachersSection.length ? (
                                                        <SelectArrayInput
                                                            label="Автор"
                                                            validate={[
                                                                required(),
                                                            ]}
                                                            source={getSource(
                                                                "auth"
                                                            )}
                                                            choices={
                                                                teachersSection
                                                            }
                                                            style={defaultStyle}
                                                        />
                                                    ) : null}
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "feedback-photos" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        style={arrayInputStyle}
                                                    />
                                                    <ArrayInput
                                                        source={getSource(
                                                            "photos"
                                                        )}
                                                        label="Фото (отзывы)"
                                                        style={arrayInputStyle}
                                                    >
                                                        <SimpleFormIterator>
                                                            <ImageInput
                                                                source="imageFeedback"
                                                                label="Изображение (максимальный размер 2МБ)"
                                                                maxSize="2000000"
                                                                accept="image/*"
                                                                placeholder={
                                                                    <p>
                                                                        Перетащите
                                                                        файл
                                                                        сюда
                                                                    </p>
                                                                }
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                            >
                                                                <PreviewImage source="src" />
                                                            </ImageInput>
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                </>
                                            ) : null}

                                            {scopedFormData.type ===
                                            "feedback-videos" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        style={arrayInputStyle}
                                                    />
                                                    <ArrayInput
                                                        source={getSource(
                                                            "videos"
                                                        )}
                                                        label="Видео с YouTube (отзывы)"
                                                        style={arrayInputStyle}
                                                    >
                                                        <SimpleFormIterator>
                                                            <TextInput
                                                                source={
                                                                    "videoCode"
                                                                }
                                                                label='Вставьте значение из поля src=""'
                                                                style={
                                                                    arrayInputStyle
                                                                }
                                                                validate={[
                                                                    required(),
                                                                ]}
                                                                multiline
                                                            />
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                </>
                                            ) : null}

                                            {scopedFormData.type === "goods" ? (
                                                <>
                                                    <TextInput
                                                        source={getSource(
                                                            "title"
                                                        )}
                                                        label="Заголовок"
                                                        validate={[required()]}
                                                        style={arrayInputStyle}
                                                    />
                                                    {goods.length ? (
                                                        <SelectArrayInput
                                                            label="Товары"
                                                            validate={[
                                                                required(),
                                                            ]}
                                                            source={getSource(
                                                                "goods"
                                                            )}
                                                            choices={goods}
                                                            style={
                                                                arrayInputStyle
                                                            }
                                                            optionValue="id"
                                                            optionText="title"
                                                        />
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </>
                                    ) : null
                                }
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                </MuiPickersUtilsProvider>
            </SimpleForm>
        </Edit>
    );
};

export default GoodsEdit;
