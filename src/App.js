import React from "react";
import { Resource, Admin } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import authProvider from './authProvider';

import myDataProvider from './myDataProvider';

import { Login } from './page';

import { MyLayout, GoodsCreate, GoodsEdit, GoodsList, GoodsTimetypeList, GoodsTimetypeCreate, GoodsTimetypeEdit, CategoriesList, CategoriesCreate, CategoriesEdit, SectionMainList, SectionMainEdit, TeachersList, TeachersCreate, TeachersEdit, SectionServicesList, SectionServicesCreate, SectionServicesEdit, SectionAboutList, SectionAboutCreate, SectionAboutEdit, FooterMenuCreate, FooterMenuList, FooterMenuEdit, FooterContactList, FooterContactEdit, PostsList, PostsCreate, PostsEdit, PostTypeList, PostTypeCreate, PostTypeEdit, TimetableList, TimetableCreate, TimetableEdit, TimetableTypeList, TimetableTypeCreate, TimetableTypeEdit, FormSubcsribeList, FormSubcsribeEdit, InstituteList, InstituteCreate, InstituteEdit, GoodsTypeList, GoodsTypeCreate, GoodsTypeEdit, FooterSocialList, FooterSocialEdit, FooterSocialCreate, FooterLegalList, FooterLegalCreate, FooterLegalEdit, UsersList, UserEdit, IntegrationPageList, IntegrationPageEdit, CoursesList, CoursesEdit, FeedbackList, FeedbackCreate, FeedbackEdit } from './components';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const App = () => (
	<Admin i18nProvider={i18nProvider} loginPage={Login} authProvider={authProvider} dataProvider={myDataProvider} appLayout={MyLayout}>
		<Resource name="categories" list={CategoriesList} create={CategoriesCreate} edit={CategoriesEdit} options={{ label: 'Категории', menu: "A" }} />

		<Resource name="goods" create={GoodsCreate} edit={GoodsEdit} list={GoodsList} options={{ label: 'Товары', menu: "B" }} />
		<Resource name="goodsTimetype" list={GoodsTimetypeList} create={GoodsTimetypeCreate} edit={GoodsTimetypeEdit} options={{ label: 'Типы времени', menu: "B" }} />
		<Resource name="goodsType" list={GoodsTypeList} create={GoodsTypeCreate} edit={GoodsTypeEdit} options={{ label: 'Типы товаров', menu: "B" }} />

		<Resource name="section/main" list={SectionMainList} edit={SectionMainEdit} options={{ label: 'Главная секция', menu: "C" }} />
		<Resource name="section/services" list={SectionServicesList} create={SectionServicesCreate} edit={SectionServicesEdit} options={{ label: "Инфо о образовании", menu: "C" }} />
		<Resource name="section/about" list={SectionAboutList} create={SectionAboutCreate} edit={SectionAboutEdit} options={{ label: 'О нас', menu: "C" }} />

		<Resource name="teachers" list={TeachersList} create={TeachersCreate} edit={TeachersEdit} options={{ label: 'Преподаватели', menu: "D" }} />

		<Resource name="footer/menu" list={FooterMenuList} create={FooterMenuCreate} edit={FooterMenuEdit} options={{ label: 'Меню', menu: "F" }} />
		<Resource name="footer/social" list={FooterSocialList} edit={FooterSocialEdit} create={FooterSocialCreate} options={{ label: 'Соц.сети', menu: "F" }} />
		<Resource name="footer/contact" list={FooterContactList} edit={FooterContactEdit} options={{ label: 'Контакты', menu: "F" }} />
		<Resource name="footer/legal" list={FooterLegalList} create={FooterLegalCreate} edit={FooterLegalEdit} options={{ label: 'Юр. информация', menu: "F" }} />

		<Resource name="posts" list={PostsList} create={PostsCreate} edit={PostsEdit} options={{ label: 'Посты', menu: "G" }} />
		<Resource name="postType" list={PostTypeList} create={PostTypeCreate} edit={PostTypeEdit} options={{ label: 'Типы постов', menu: "G" }} />

		<Resource name="timetable" list={TimetableList} create={TimetableCreate} edit={TimetableEdit} options={{ label: 'Расписание', menu: "H" }} />
		<Resource name="timetableType" list={TimetableTypeList} create={TimetableTypeCreate} edit={TimetableTypeEdit} options={{ label: 'Типы расписания', menu: "H" }} />

		<Resource name="form" list={FormSubcsribeList} edit={FormSubcsribeEdit} options={{ label: 'Рассылка института', menu: "I" }} />

		<Resource name="institute" list={InstituteList} create={InstituteCreate} edit={InstituteEdit} options={{ label: 'О Институте', menu: "J" }} />

		<Resource name="users" list={UsersList} edit={UserEdit} options={{ label: 'Пользователи', menu: "K" }} />

		<Resource name="integrationPage" list={IntegrationPageList} edit={IntegrationPageEdit} options={{ label: 'Интеграции', menu: "L" }} />

		<Resource name="courses" list={CoursesList} edit={CoursesEdit} options={{ label: 'Сессионная комната', menu: "M" }} />
	
		<Resource name="feedback" list={FeedbackList} create={FeedbackCreate} edit={FeedbackEdit} options={{ label: 'Отзывы', menu: "N" }} />
	</Admin>
);

export default App;