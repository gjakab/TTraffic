import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '../../ui/layouts/MainLayout';
import MainHome from '../../ui/components/main/MainHome';
import MainPostList from '../../ui/components/main/MainPostList';
import MainPostPage from '../../ui/components/main/postPage/MainPostPage';

import AdminLogin from '../../ui/pages/admin/AdminLogin';
import AdminLayout from '../../ui/layouts/AdminLayout';
import AdminHome from '../../ui/components/admin/AdminHome';
import AdminPostList from '../../ui/components/admin/AdminPostList';
import AdminPostPage from '../../ui/components/admin/postPage/AdminPostPage';
import AdminAddPostPage from '../../ui/components/admin/postPage/AdminAddPostPage';
import AdminEditPostPage from '../../ui/components/admin/postPage/AdminEditPostPage';

import AdminAddBlogpostPage from '../../ui/components/admin/blogpostPage/AdminAddBlogpostPage';

import AdminUser from '../../ui/components/admin/userPage/AdminUser';
import AdminAddUser from '../../ui/components/admin/userPage/AdminAddUser';

import AdminNotFound from '../../ui/pages/admin/AdminNotFound';
import MainNotFound from '../../ui/pages/main/MainNotFound';


let Routes = ()=>(
	   <Router history={browserHistory} >
          <Route path='/admin/login' onEnter={onLoginEnter} component={AdminLogin}/>
          <Route path='/admin' onEnter={onAdminEnter} component={AdminLayout}>
              
              <Route path='/admin/post/new' onEnter={() => window.scrollTo(0, 0)} component={AdminAddPostPage}/>
              <Route path='/admin/post/edit/:id/:dataId' onEnter={() => window.scrollTo(0, 0)} component={AdminEditPostPage}/>
              <Route path='/admin/post/:id/:dataId' onEnter={() => window.scrollTo(0, 0)} component={AdminPostPage}/>
              <Route path='/admin/blogpost/new' onEnter={() => window.scrollTo(0, 0)} component={AdminAddBlogpostPage}/>
              <Route path='/admin/user' onEnter={() => window.scrollTo(0, 0)} component={AdminUser}/>
              <Route path='/admin/user/new' onEnter={() => window.scrollTo(0, 0)} component={AdminAddUser}/>
              <Route path='/admin/notfound' component = {AdminNotFound}/>
              <Route component={AdminHome}>
                  <IndexRoute component={AdminPostList}/>
                  <Route onEnter={onAdminSectionEnter} path='/admin/section/:section' component={AdminPostList}/>
                  <Route onEnter={hookChain(onAdminSectionEnter,onAdminListingEnter)} path='/admin/section/:section/:limit' component={AdminPostList}/>
                  <Route onEnter={onAdminListingEnter} path='/admin/all/:limit' component={AdminPostList}/>
                  <Route onEnter={onAdminListingEnter} path='/admin/:limit' component={AdminPostList}/>
              </Route>
              <Route path='/admin/*' component = {AdminNotFound}/>

          </Route> 
        	<Route path='/' component={MainLayout}>
              <Route path='/notfound' component = {MainNotFound}/>
              <Route component={MainHome}>
                  <IndexRoute component={MainPostList}/>
                  <Route path='search/:filter' onEnter={() => window.scrollTo(0, 0)} component={MainPostList}/>
                  <Route path='search/:filter/:limit' onEnter={hookChain(onMainListingEnter, () => window.scrollTo(0, 0))} component={MainPostList}/>
                  <Route path='category/:category' onEnter={onCategoryEnter} component={MainPostList}/>
                  <Route path='category/:category/:limit' onEnter={hookChain(onCategoryEnter,onMainListingEnter)} component={MainPostList}/>
                  <Route onEnter={onMainListingEnter} path='/:limit' component={MainPostList}/>
              </Route>
              <Route path='/post/:id/:dataId'  onEnter={() => window.scrollTo(0, 0)} component={MainPostPage}/>
              <Route path='/*' component = {MainNotFound}/>
          </Route>
     </Router>	
);

function onLoginEnter(nextState, replace){
  Meteor.setTimeout(function(){
    if(Meteor.user()){
      browserHistory.push('/admin');
    }
  },500);
}

function onAdminEnter(nextState, replace){
  Meteor.setTimeout(function(){
    if(!Meteor.user()){
      browserHistory.push('/admin/login');
    }   
  },500);
}

function onCategoryEnter(nextState, replace){
  const categories = [
      'news',
      'movies',
      'technology',
      'international',
      'food',
      'deals'
  ];
  if(categories.indexOf(nextState.params.category)===-1){
    replace('/notfound');
  }
}

function hookChain(...args){
  return function(nextState, replace){
    args.forEach((hook)=>{
      return hook(nextState, replace);
    });
  }
}

function  onAdminListingEnter(nextState, replace){
  if(typeof Number(nextState.params.limit) !== 'number' || Number(nextState.params.limit)!=Number(nextState.params.limit)){
    replace('/admin/notfound');
  }
}

function  onAdminSectionEnter(nextState, replace){
  const sections = [
      'posted',
      'deleted',
      'deals'
  ];
  if(sections.indexOf(nextState.params.section)===-1){
    replace('/admin/notfound');
  }
}

function  onMainListingEnter(nextState, replace){
  if(typeof Number(nextState.params.limit) !== 'number' || Number(nextState.params.limit)!=Number(nextState.params.limit)){
    replace('/notfound');
  }
}

Meteor.startup(function() {
    render(<Routes/>, document.getElementById('app'));
});