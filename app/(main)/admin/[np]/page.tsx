import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/admin.action'
import { UserType } from '@/lib/type'
import React from 'react'

export default async function DetailAccount({
    params,
  }: {
    params: { np: string }
  }) {
    
    const data = await getUser(params.np)
    const account = data? data.result : null as unknown as UserType

    return (
        <RegisterForm isUpdate={true} account={account} />
    )
}

