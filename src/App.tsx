import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { VideoHome } from './components/video-home'
import { Userlogin } from './components/user-login'
import { AdminLogin } from './components/admin-login'
import { AdminDash } from './components/admin-dash'
import { RegisterUser } from './components/register-user'
import { UserDash } from './components/user-dash'
import { AddVideo } from './components/add-video'
import { EditVideo } from './components/edit-video'
import { DeleteVideo } from './components/delete-video'

function App() {
  return (
    <div className='body-background' >
      <div className='bg-shade'>
      <BrowserRouter>
        <header className='p-4 flex justify-center text-4xl font-medium text-white  text-center '><span>Technologies  Video Library </span> 
        </header>
        <section className='mt-4'>
          <Routes>
            <Route path='/' element={<VideoHome />} />
            <Route path='/user-login' element={<Userlogin/>} />
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path='/admin-dash' element={<AdminDash/>}/>
            <Route path='/register-user' element={<RegisterUser/>}/>
            <Route path='/user-dash' element={<UserDash/>} />
            <Route path='/add-video' element={<AddVideo/>} />
            <Route path='/edit-video/:id' element={<EditVideo/>} />
            <Route path='/delete-video/:id' element={<DeleteVideo/>} />
          </Routes>
        </section>

      </BrowserRouter>

      </div>

    </div>
  )
}

export default App
