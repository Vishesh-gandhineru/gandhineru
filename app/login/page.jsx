
import LoginForm from '../components/LoginConponents/LoginForm';
const page = () => {
  return (
    <section className='flex flex-col justify-center items-center h-[75vh]'>
        
    <div className="w-full max-w-xs">
        <h2 className='text-black font-semibold text-xl text-center w-full'>Login Form</h2>
      <LoginForm />
  
</div>
    </section>

  )
}

export default page