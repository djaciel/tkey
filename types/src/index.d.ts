import BN from "bn.js";
import { CatchupToLatestShareResult, GenerateNewShareResult, InitializeNewKeyResult, IThresholdBak, KeyDetails, ModuleMap, RefreshMiddlewareMap, RefreshSharesResult, ThresholdBakArgs } from "./base/aggregateTypes";
import { BNString, IServiceProvider, IStorageLayer, PolynomialID } from "./base/commonTypes";
import Point from "./base/Point";
import { Polynomial } from "./base/Polynomial";
import Share from "./base/Share";
import ShareStore, { ScopedStore, ShareStoreMap, ShareStorePolyIDShareIndexMap } from "./base/ShareStore";
import Metadata from "./metadata";
declare class ThresholdBak implements IThresholdBak {
    modules: ModuleMap;
    enableLogging: boolean;
    serviceProvider: IServiceProvider;
    storageLayer: IStorageLayer;
    shares: ShareStorePolyIDShareIndexMap;
    privKey: BN;
    metadata: Metadata;
    refreshMiddleware: RefreshMiddlewareMap;
    storeDeviceShare: (deviceShareStore: ShareStore) => Promise<void>;
    constructor({ enableLogging, modules, serviceProvider, storageLayer, directParams }: ThresholdBakArgs);
    initialize(input: ShareStore): Promise<KeyDetails>;
    catchupToLatestShare(shareStore: ShareStore): Promise<CatchupToLatestShareResult>;
    reconstructKey(): BN;
    generateNewShare(): Promise<GenerateNewShareResult>;
    refreshShares(threshold: number, newShareIndexes: Array<string>, previousPolyID: PolynomialID): Promise<RefreshSharesResult>;
    initializeNewKey(userInput?: BN, initializeModules?: boolean): Promise<InitializeNewKeyResult>;
    inputShare(shareStore: ShareStore): void;
    outputShare(shareIndex: BNString): ShareStore;
    setKey(privKey: BN): void;
    getKeyDetails(): KeyDetails;
    syncShareMetadata(adjustScopedStore?: (ss: ScopedStore) => ScopedStore): Promise<void>;
    addRefreshMiddleware(moduleName: string, middleware: (generalStore: unknown, oldShareStores: ShareStoreMap, newShareStores: ShareStoreMap) => unknown): void;
    setDeviceStorage(storeDeviceStorage: (deviceShareStore: ShareStore) => Promise<void>): void;
}
declare function lagrangeInterpolatePolynomial(points: Array<Point>): Polynomial;
declare function lagrangeInterpolation(shares: Array<BN>, nodeIndex: Array<BN>): BN;
declare function generateRandomPolynomial(degree: number, secret?: BN, determinsticShares?: Array<Share>): Polynomial;
export { ThresholdBak, Metadata, generateRandomPolynomial, lagrangeInterpolation, lagrangeInterpolatePolynomial };