import React, { useContext, useEffect } from 'react';
import './Profile.css';
import LoadingPage from '../LoadingPage/LoadingPage';
import PostCard from '../PostCard/PostCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { authContext } from '../../Contexts/AuthContextProvider';
import CreatePost from '../CreatePost/CreatePost';
import UserInfoCard from './../UserInfoCard/UserInfoCard';

export default function Profile() {
  const { logedUserId, updateUser } = useContext(authContext);

  // Fetch fresh user profile data to update context
  function getUserProfile() {
    return axios.get('https://linked-posts.routemisr.com/users/profile-data', {
      headers: {
        token: localStorage.getItem('tkn')
      }
    });
  }

  // Fetch user's posts (using dynamic ID if needed; adjust endpoint if it's not /profile-data)
  function getAllUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${logedUserId}/posts`, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    });
  }

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError
  } = useQuery({
    queryKey: ['userProfile', logedUserId],
    queryFn: getUserProfile,
    enabled: !!logedUserId,
    refetchOnMount: true, // Refetch on page load to get latest data
  });

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError
  } = useQuery({
    queryKey: ['userPosts', logedUserId],
    queryFn: getAllUserPosts,
    enabled: !!logedUserId,
    refetchOnMount: true,
  });

  // Update context with fresh user data once fetched
  useEffect(() => {
    if (userData) {
      updateUser(userData); // This syncs the context with the latest backend data
    }
  }, [userData, updateUser]);

  if (userLoading || postsLoading) {
    return <LoadingPage />;
  }
  if (userError || postsError) {
    return <h2>Error happened</h2>;
  }

  const allUserPosts = structuredClone(postsData.data.posts).reverse();

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
        <div className="py-20">
          <UserInfoCard postsNum={allUserPosts.length} />
          <CreatePost />
          {allUserPosts && allUserPosts.map(post => (<PostCard post={post} key={post.id} />))}
        </div>
      </div>
    </>
  );
}