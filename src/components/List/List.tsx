import type { User } from "../Form/Form";

interface ListProps{
  users: User[]
  deleteUser: (id: number) => void;
}
  


export function List({users, deleteUser}: ListProps) {
  return <div className="grid grid-cols-4 gap-3 mt-5 bg-amber-300">
  {users.map((user) => (
    <div key={user.id} className="bg-pink-300 shadow-md rounded-lg p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900">{user.name}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium text-gray-700">Age:</span>
          <span className="text-gray-900">{user.age}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
      </div>
      <button
        className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
        title="Delete user"
        onClick={() => deleteUser(user.id!)}
      >
        Delete
        &times;
      </button>
    </div>
  ))}
</div>;
  




  //   <>
  //     <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
  //       <span className="block border-b-2 border-indigo-500 pb-1">
  //         Users List
  //       </span>
  //     </h2>
  //     <div className="flex gap-2">
  //       <ul className="space-y-4">
  //         <li className="flex justify-between items-start bg-white shadow-md rounded-lg p-4">
  //           <div className="flex flex-col gap-2">
  //             <div className="flex gap-2">
  //               <span className="font-medium text-gray-700">Name:</span>
  //               <span className="text-gray-900">Хмелюк Сергій</span>
  //             </div>
  //             <div className="flex gap-2">
  //               <span className="font-medium text-gray-700">Age:</span>
  //               <span className="text-gray-900">25</span>
  //             </div>
  //             <div className="flex gap-2">
  //               <span className="font-medium text-gray-700">Email:</span>
  //               <span className="text-gray-900">s.hmeljuk@gmail.com</span>
  //             </div>
  //           </div>
  //           <button
  //             className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
  //             title="Delete user"
  //           >
  //             &times;
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //   </>
  // );
}
