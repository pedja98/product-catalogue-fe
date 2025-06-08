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
      <TariffPlanAddCharacteristicDialog
        tariffPlanId={customConfirmComponentAttributes.tariffPlanId as string}
        refetch={customConfirmComponentAttributes.refetch as () => void}
      />
    ),
    [EntityConfirmationDialogOptions.TariffPlanSaveDiscountDialog]: (
      <TariffPlanSaveDiscountDialog
        tariffPlanIdentifier={customConfirmComponentAttributes.tariffPlanIdentifier as string}
        refetch={customConfirmComponentAttributes.refetch as () => void}
      />
    ),
  }

  return dialogs[confirmationComponentContext]
}
