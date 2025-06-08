import { ReactNode } from 'react'
import { EntityConfirmationDialogOptions } from '../types/common'
import TariffPlanAddCharacteristicDialog from '../components/EntityDialogs/TariffPlanAddCharacteristicDialog'
import TariffPlanSaveDiscountDialog from '../components/EntityDialogs/TariffPlanSaveDiscountDialog'

export const getEntityConfirmationDialog = (
  confirmationComponentContext: EntityConfirmationDialogOptions,
  customConfirmComponentAttributes: Record<string, unknown>,
): ReactNode | undefined => {
  const dialogs: Partial<Record<string, ReactNode>> = {
    [EntityConfirmationDialogOptions.TariffPlanAddCharacteristicDialog]: (
      <TariffPlanAddCharacteristicDialog tariffPlanId={customConfirmComponentAttributes.tariffPlanId as string} />
    ),
    [EntityConfirmationDialogOptions.TariffPlanSaveDiscountDialog]: (
      <TariffPlanSaveDiscountDialog
        tariffPlanIdentifier={customConfirmComponentAttributes.tariffPlanIdentifier as string}
      />
    ),
  }

  return dialogs[confirmationComponentContext]
}
