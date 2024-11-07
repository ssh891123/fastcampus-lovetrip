import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Hotel, ReservactionForm } from '@models/hotel'

import FixedBottomButton from '@shared/FixedBottomButton'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import Select from '@shared/Selected'
import Spacing from '../shared/Spacing'

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: () => void
  buttonLabel: string
}) {
  //blur 이벤트가 발생했을 때, 유효성 검사
  const { register, formState, handleSubmit } = useForm({ mode: 'onBlur' })

  // console.log('forms', forms)
  // console.log('formState', formState.errors)

  const components = useCallback(
    (form: ReservactionForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [register, formState.errors],
  )

  return (
    <div style={{ padding: '0 24px' }}>
      <Text bold={true}>예약 정보</Text>

      <Spacing size={16} />

      <form>
        {forms.map((form) => {
          return (
            <Fragment key={form.id}>
              {components(form)}
              <Spacing size={8} />
            </Fragment>
          )
        })}
      </form>

      <Spacing size={80} />

      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: { value: RegExp; message: string }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인주세요.',
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요.',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화 번호를 확인해주세요.',
  },
}

export default Form
