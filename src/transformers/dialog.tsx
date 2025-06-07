import { ReactNode } from 'react'
import { EntityConfirmationDialogOptions } from '../types/common'

export const getEntityConfirmationDialog = (
  confirmationComponentContext: EntityConfirmationDialogOptions,
  customConfirmComponentAttributes: Record<string, unknown>,
): ReactNode | undefined => {
  // const dialogs: Partial<Record<string, ReactNode>> = {
  //   [EntityConfirmationDialogOptions.CompanyContactRelationCreateDialog]: (
  //     <CompanyContactRelationCreateDialog contactId={customConfirmComponentAttributes?.contactId as number} />
  //   ),
  //   [EntityConfirmationDialogOptions.CompanyContactRelationUpdateDialog]: (
  //     <CompanyContactRelationUpdateDialog
  //       relationId={customConfirmComponentAttributes?.relationId as number}
  //       relationType={customConfirmComponentAttributes?.relationType as CompanyContactRelationType}
  //       companyId={customConfirmComponentAttributes?.companyId as number}
  //     />
  //   ),
  // }

  // return dialogs[confirmationComponentContext]
  return undefined
}
