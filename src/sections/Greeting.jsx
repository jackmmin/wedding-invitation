import { invitation } from '../config/invitation.config'

export default function Greeting() {
  const { groom, bride } = invitation

  return (
    <section className="px-6 py-20 text-center max-w-md mx-auto">
      <h2 className="font-serif text-xl text-stone-800 mb-8">
        {invitation.greetingTitle}
      </h2>

      <p className="whitespace-pre-line text-stone-600 leading-loose text-[15px]">
        {invitation.greetingMessage}
      </p>

      <div className="mt-12 flex justify-center gap-10 text-sm text-stone-600">
        <div>
          <p className="text-stone-400 text-xs mb-1">신랑측</p>
          <p>
            {groom.fatherName} · {groom.motherName}의 아들 {groom.name}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-10 text-sm text-stone-600">
        <div>
          <p className="text-stone-400 text-xs mb-1">신부측</p>
          <p>
            {bride.fatherName} · {bride.motherName}의 딸 {bride.name}
          </p>
        </div>
      </div>
    </section>
  )
}
