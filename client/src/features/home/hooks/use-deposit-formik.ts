import * as Yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = Yup.object({
  amount: Yup.string().trim().required('Amount is required.'),
  asset: Yup.string().required('Please select one asset.'),
})

export const useDepositFormik = ({ onSuccess }: { onSuccess: () => void }) => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      asset: null,
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async ({ amount, asset }) => {},
  })

  return { ...formik }
}
