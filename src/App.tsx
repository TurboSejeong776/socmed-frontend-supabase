import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Logi from './page-folder/login';
import Regi from './page-folder/register';
import Homepage from './page-folder/timeline';
import Profile from './page-folder/user-profile';
import MyProfile from './page-folder/my-profile';
import NewPost from './page-folder/newpost';
import EditProfile from './page-folder/edit-profile';
import Detail from './page-folder/detail';
import Navigation from './my-components/Navigation';

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster
            richColors
            className='w-full h-[40px] px-[12px] py-[8px] gap-[8px] rounded-[8px]'
          />
          <Routes>
            <Route path='/' element={<Logi />} />
            <Route path='/register' element={<Regi />} />
            <Route path='/home' element={<Homepage />} />

            <Route path='/new' element={<NewPost />} />

            <Route path='/profile/:username' element={<Profile />} />
            <Route path='/profile/me' element={<MyProfile />} />
            <Route path='/profile/me/edit' element={<EditProfile />} />
            <Route path='/post/:postId' element={<Detail />} />
          </Routes>
          <Navigation />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
