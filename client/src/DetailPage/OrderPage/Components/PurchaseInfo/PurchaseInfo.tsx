import styles from "./PurchaseInfo.module.scss";

import { PurchaseInfoItems } from "../PurchaseInfoItems";

type Props = {
	isLoading: boolean;
};

export const PurchaseInfo = ({ isLoading }: Props) => {
	return (
		<div className={styles.container}>
			<PurchaseInfoItems isLoading={isLoading} />
		</div>
	);
};
