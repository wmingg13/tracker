import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RecordModel = runtime.Types.Result.DefaultSelection<Prisma.$RecordPayload>;
export type AggregateRecord = {
    _count: RecordCountAggregateOutputType | null;
    _avg: RecordAvgAggregateOutputType | null;
    _sum: RecordSumAggregateOutputType | null;
    _min: RecordMinAggregateOutputType | null;
    _max: RecordMaxAggregateOutputType | null;
};
export type RecordAvgAggregateOutputType = {
    id: number | null;
    clientId: number | null;
};
export type RecordSumAggregateOutputType = {
    id: number | null;
    clientId: number | null;
};
export type RecordMinAggregateOutputType = {
    id: number | null;
    clientId: number | null;
    date: Date | null;
    photo: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecordMaxAggregateOutputType = {
    id: number | null;
    clientId: number | null;
    date: Date | null;
    photo: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecordCountAggregateOutputType = {
    id: number;
    clientId: number;
    date: number;
    photo: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RecordAvgAggregateInputType = {
    id?: true;
    clientId?: true;
};
export type RecordSumAggregateInputType = {
    id?: true;
    clientId?: true;
};
export type RecordMinAggregateInputType = {
    id?: true;
    clientId?: true;
    date?: true;
    photo?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecordMaxAggregateInputType = {
    id?: true;
    clientId?: true;
    date?: true;
    photo?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecordCountAggregateInputType = {
    id?: true;
    clientId?: true;
    date?: true;
    photo?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecordWhereInput;
    orderBy?: Prisma.RecordOrderByWithRelationInput | Prisma.RecordOrderByWithRelationInput[];
    cursor?: Prisma.RecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecordCountAggregateInputType;
    _avg?: RecordAvgAggregateInputType;
    _sum?: RecordSumAggregateInputType;
    _min?: RecordMinAggregateInputType;
    _max?: RecordMaxAggregateInputType;
};
export type GetRecordAggregateType<T extends RecordAggregateArgs> = {
    [P in keyof T & keyof AggregateRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecord[P]> : Prisma.GetScalarType<T[P], AggregateRecord[P]>;
};
export type RecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecordWhereInput;
    orderBy?: Prisma.RecordOrderByWithAggregationInput | Prisma.RecordOrderByWithAggregationInput[];
    by: Prisma.RecordScalarFieldEnum[] | Prisma.RecordScalarFieldEnum;
    having?: Prisma.RecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecordCountAggregateInputType | true;
    _avg?: RecordAvgAggregateInputType;
    _sum?: RecordSumAggregateInputType;
    _min?: RecordMinAggregateInputType;
    _max?: RecordMaxAggregateInputType;
};
export type RecordGroupByOutputType = {
    id: number;
    clientId: number;
    date: Date;
    photo: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RecordCountAggregateOutputType | null;
    _avg: RecordAvgAggregateOutputType | null;
    _sum: RecordSumAggregateOutputType | null;
    _min: RecordMinAggregateOutputType | null;
    _max: RecordMaxAggregateOutputType | null;
};
type GetRecordGroupByPayload<T extends RecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecordGroupByOutputType[P]>;
}>>;
export type RecordWhereInput = {
    AND?: Prisma.RecordWhereInput | Prisma.RecordWhereInput[];
    OR?: Prisma.RecordWhereInput[];
    NOT?: Prisma.RecordWhereInput | Prisma.RecordWhereInput[];
    id?: Prisma.IntFilter<"Record"> | number;
    clientId?: Prisma.IntFilter<"Record"> | number;
    date?: Prisma.DateTimeFilter<"Record"> | Date | string;
    photo?: Prisma.StringNullableFilter<"Record"> | string | null;
    notes?: Prisma.StringNullableFilter<"Record"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
    client?: Prisma.XOR<Prisma.ClientScalarRelationFilter, Prisma.ClientWhereInput>;
};
export type RecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    photo?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    client?: Prisma.ClientOrderByWithRelationInput;
};
export type RecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.RecordWhereInput | Prisma.RecordWhereInput[];
    OR?: Prisma.RecordWhereInput[];
    NOT?: Prisma.RecordWhereInput | Prisma.RecordWhereInput[];
    clientId?: Prisma.IntFilter<"Record"> | number;
    date?: Prisma.DateTimeFilter<"Record"> | Date | string;
    photo?: Prisma.StringNullableFilter<"Record"> | string | null;
    notes?: Prisma.StringNullableFilter<"Record"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
    client?: Prisma.XOR<Prisma.ClientScalarRelationFilter, Prisma.ClientWhereInput>;
}, "id">;
export type RecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    photo?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RecordCountOrderByAggregateInput;
    _avg?: Prisma.RecordAvgOrderByAggregateInput;
    _max?: Prisma.RecordMaxOrderByAggregateInput;
    _min?: Prisma.RecordMinOrderByAggregateInput;
    _sum?: Prisma.RecordSumOrderByAggregateInput;
};
export type RecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecordScalarWhereWithAggregatesInput | Prisma.RecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecordScalarWhereWithAggregatesInput | Prisma.RecordScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Record"> | number;
    clientId?: Prisma.IntWithAggregatesFilter<"Record"> | number;
    date?: Prisma.DateTimeWithAggregatesFilter<"Record"> | Date | string;
    photo?: Prisma.StringNullableWithAggregatesFilter<"Record"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Record"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Record"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Record"> | Date | string;
};
export type RecordCreateInput = {
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.ClientCreateNestedOneWithoutRecordsInput;
};
export type RecordUncheckedCreateInput = {
    id?: number;
    clientId: number;
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecordUpdateInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.ClientUpdateOneRequiredWithoutRecordsNestedInput;
};
export type RecordUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordCreateManyInput = {
    id?: number;
    clientId: number;
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecordUpdateManyMutationInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordListRelationFilter = {
    every?: Prisma.RecordWhereInput;
    some?: Prisma.RecordWhereInput;
    none?: Prisma.RecordWhereInput;
};
export type RecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    photo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecordAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
};
export type RecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    photo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    photo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecordSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
};
export type RecordCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput> | Prisma.RecordCreateWithoutClientInput[] | Prisma.RecordUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.RecordCreateOrConnectWithoutClientInput | Prisma.RecordCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.RecordCreateManyClientInputEnvelope;
    connect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
};
export type RecordUncheckedCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput> | Prisma.RecordCreateWithoutClientInput[] | Prisma.RecordUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.RecordCreateOrConnectWithoutClientInput | Prisma.RecordCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.RecordCreateManyClientInputEnvelope;
    connect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
};
export type RecordUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput> | Prisma.RecordCreateWithoutClientInput[] | Prisma.RecordUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.RecordCreateOrConnectWithoutClientInput | Prisma.RecordCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.RecordUpsertWithWhereUniqueWithoutClientInput | Prisma.RecordUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.RecordCreateManyClientInputEnvelope;
    set?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    disconnect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    delete?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    connect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    update?: Prisma.RecordUpdateWithWhereUniqueWithoutClientInput | Prisma.RecordUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.RecordUpdateManyWithWhereWithoutClientInput | Prisma.RecordUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.RecordScalarWhereInput | Prisma.RecordScalarWhereInput[];
};
export type RecordUncheckedUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput> | Prisma.RecordCreateWithoutClientInput[] | Prisma.RecordUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.RecordCreateOrConnectWithoutClientInput | Prisma.RecordCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.RecordUpsertWithWhereUniqueWithoutClientInput | Prisma.RecordUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.RecordCreateManyClientInputEnvelope;
    set?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    disconnect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    delete?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    connect?: Prisma.RecordWhereUniqueInput | Prisma.RecordWhereUniqueInput[];
    update?: Prisma.RecordUpdateWithWhereUniqueWithoutClientInput | Prisma.RecordUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.RecordUpdateManyWithWhereWithoutClientInput | Prisma.RecordUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.RecordScalarWhereInput | Prisma.RecordScalarWhereInput[];
};
export type RecordCreateWithoutClientInput = {
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecordUncheckedCreateWithoutClientInput = {
    id?: number;
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecordCreateOrConnectWithoutClientInput = {
    where: Prisma.RecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput>;
};
export type RecordCreateManyClientInputEnvelope = {
    data: Prisma.RecordCreateManyClientInput | Prisma.RecordCreateManyClientInput[];
    skipDuplicates?: boolean;
};
export type RecordUpsertWithWhereUniqueWithoutClientInput = {
    where: Prisma.RecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecordUpdateWithoutClientInput, Prisma.RecordUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.RecordCreateWithoutClientInput, Prisma.RecordUncheckedCreateWithoutClientInput>;
};
export type RecordUpdateWithWhereUniqueWithoutClientInput = {
    where: Prisma.RecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecordUpdateWithoutClientInput, Prisma.RecordUncheckedUpdateWithoutClientInput>;
};
export type RecordUpdateManyWithWhereWithoutClientInput = {
    where: Prisma.RecordScalarWhereInput;
    data: Prisma.XOR<Prisma.RecordUpdateManyMutationInput, Prisma.RecordUncheckedUpdateManyWithoutClientInput>;
};
export type RecordScalarWhereInput = {
    AND?: Prisma.RecordScalarWhereInput | Prisma.RecordScalarWhereInput[];
    OR?: Prisma.RecordScalarWhereInput[];
    NOT?: Prisma.RecordScalarWhereInput | Prisma.RecordScalarWhereInput[];
    id?: Prisma.IntFilter<"Record"> | number;
    clientId?: Prisma.IntFilter<"Record"> | number;
    date?: Prisma.DateTimeFilter<"Record"> | Date | string;
    photo?: Prisma.StringNullableFilter<"Record"> | string | null;
    notes?: Prisma.StringNullableFilter<"Record"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Record"> | Date | string;
};
export type RecordCreateManyClientInput = {
    id?: number;
    date: Date | string;
    photo?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecordUpdateWithoutClientInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordUncheckedUpdateWithoutClientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordUncheckedUpdateManyWithoutClientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    date?: boolean;
    photo?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["record"]>;
export type RecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    date?: boolean;
    photo?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["record"]>;
export type RecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    date?: boolean;
    photo?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["record"]>;
export type RecordSelectScalar = {
    id?: boolean;
    clientId?: boolean;
    date?: boolean;
    photo?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "clientId" | "date" | "photo" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["record"]>;
export type RecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
};
export type RecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
};
export type RecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.ClientDefaultArgs<ExtArgs>;
};
export type $RecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Record";
    objects: {
        client: Prisma.$ClientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        clientId: number;
        date: Date;
        photo: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["record"]>;
    composites: {};
};
export type RecordGetPayload<S extends boolean | null | undefined | RecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecordPayload, S>;
export type RecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecordCountAggregateInputType | true;
};
export interface RecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Record'];
        meta: {
            name: 'Record';
        };
    };
    findUnique<T extends RecordFindUniqueArgs>(args: Prisma.SelectSubset<T, RecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecordFindFirstArgs>(args?: Prisma.SelectSubset<T, RecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecordFindManyArgs>(args?: Prisma.SelectSubset<T, RecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecordCreateArgs>(args: Prisma.SelectSubset<T, RecordCreateArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecordCreateManyArgs>(args?: Prisma.SelectSubset<T, RecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecordDeleteArgs>(args: Prisma.SelectSubset<T, RecordDeleteArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecordUpdateArgs>(args: Prisma.SelectSubset<T, RecordUpdateArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecordUpdateManyArgs>(args: Prisma.SelectSubset<T, RecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecordUpsertArgs>(args: Prisma.SelectSubset<T, RecordUpsertArgs<ExtArgs>>): Prisma.Prisma__RecordClient<runtime.Types.Result.GetResult<Prisma.$RecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecordCountArgs>(args?: Prisma.Subset<T, RecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecordCountAggregateOutputType> : number>;
    aggregate<T extends RecordAggregateArgs>(args: Prisma.Subset<T, RecordAggregateArgs>): Prisma.PrismaPromise<GetRecordAggregateType<T>>;
    groupBy<T extends RecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecordGroupByArgs['orderBy'];
    } : {
        orderBy?: RecordGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecordFieldRefs;
}
export interface Prisma__RecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    client<T extends Prisma.ClientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClientDefaultArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecordFieldRefs {
    readonly id: Prisma.FieldRef<"Record", 'Int'>;
    readonly clientId: Prisma.FieldRef<"Record", 'Int'>;
    readonly date: Prisma.FieldRef<"Record", 'DateTime'>;
    readonly photo: Prisma.FieldRef<"Record", 'String'>;
    readonly notes: Prisma.FieldRef<"Record", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Record", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Record", 'DateTime'>;
}
export type RecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where: Prisma.RecordWhereUniqueInput;
};
export type RecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where: Prisma.RecordWhereUniqueInput;
};
export type RecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where?: Prisma.RecordWhereInput;
    orderBy?: Prisma.RecordOrderByWithRelationInput | Prisma.RecordOrderByWithRelationInput[];
    cursor?: Prisma.RecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecordScalarFieldEnum | Prisma.RecordScalarFieldEnum[];
};
export type RecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where?: Prisma.RecordWhereInput;
    orderBy?: Prisma.RecordOrderByWithRelationInput | Prisma.RecordOrderByWithRelationInput[];
    cursor?: Prisma.RecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecordScalarFieldEnum | Prisma.RecordScalarFieldEnum[];
};
export type RecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where?: Prisma.RecordWhereInput;
    orderBy?: Prisma.RecordOrderByWithRelationInput | Prisma.RecordOrderByWithRelationInput[];
    cursor?: Prisma.RecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecordScalarFieldEnum | Prisma.RecordScalarFieldEnum[];
};
export type RecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecordCreateInput, Prisma.RecordUncheckedCreateInput>;
};
export type RecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecordCreateManyInput | Prisma.RecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    data: Prisma.RecordCreateManyInput | Prisma.RecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecordUpdateInput, Prisma.RecordUncheckedUpdateInput>;
    where: Prisma.RecordWhereUniqueInput;
};
export type RecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecordUpdateManyMutationInput, Prisma.RecordUncheckedUpdateManyInput>;
    where?: Prisma.RecordWhereInput;
    limit?: number;
};
export type RecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecordUpdateManyMutationInput, Prisma.RecordUncheckedUpdateManyInput>;
    where?: Prisma.RecordWhereInput;
    limit?: number;
    include?: Prisma.RecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where: Prisma.RecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecordCreateInput, Prisma.RecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecordUpdateInput, Prisma.RecordUncheckedUpdateInput>;
};
export type RecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
    where: Prisma.RecordWhereUniqueInput;
};
export type RecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecordWhereInput;
    limit?: number;
};
export type RecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecordSelect<ExtArgs> | null;
    omit?: Prisma.RecordOmit<ExtArgs> | null;
    include?: Prisma.RecordInclude<ExtArgs> | null;
};
export {};
