// import {
//   Menubar,
//   MenubarCheckboxItem,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarRadioGroup,
//   MenubarRadioItem,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
// } from "./shadcn/ui/menubar"

import "client/tailwind.css";

export function Header() {
  return (
    <header className="bg-white border border-black p-2.5 flex justify-end items-center m-0">
      <div className="flex items-center">
        <div className="mr-2.5 flex items-center">
          <span>ログイン状態: ログイン済み</span>
          <span className="ml-2.5"> | 権限: 管理者</span>
          <span className="ml-2.5"> | メールアドレス: user@example.com</span>
        </div>
        <button className="bg-black text-white rounded-full py-2.5 px-5 mr-2.5">パスワード変更</button>
        <button className="bg-black text-white rounded-full py-2.5 px-5">ログアウト</button>
      </div>
    </header>
  )
}
