import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartOfAccountsModule } from './chart-of-accounts/chart-of-accounts.module';
import { EquipmentModule } from './equipment/equipment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { Module } from '@nestjs/common';
import { Breed } from './Core Models/Breed';
import { Shed } from './Core Models/Shed';
import { Farm } from './Core Models/Farm';
import { EggProduction } from './Core Models/EggProduction';
import { Poultry } from './Core Models/Poultry';
import { FrozenPoultryInventory } from './Core Models/FrozenPoultryInventory';
import { SpoilageLoss } from './Core Models/SpoilageLoss';
import { InventoryTakeDetail } from './Core Models/InventoryTakeDetail';
import { Feed } from './Core Models/Feed';
import { Medication } from './Core Models/Medication';
import { FeedConsumption } from './Core Models/FeedConsumption';
import { Mortality } from './Core Models/Mortality';
import { TreatmentSchedule } from './Core Models/TreatmentSchedule';
import { Purchase } from './Core Models/Purchase ';
import { PurchaseReturn } from './Core Models/PurchaseReturn';
import { PurchaseReturnDetail } from './Core Models/PurchaseReturnDetail';
import { Sale } from './Core Models/Sale ';
import { SalesReturn } from './Core Models/SalesReturn';
import { SalesReturnDetail } from './Core Models/SalesReturnDetail';
import { Supplier } from './Core Models/Supplier';
import { Customer } from './Core Models/Customer';
import { User } from './Core Models/User';
import { Role } from './Core Models/Role';
import { Employee } from './Core Models/Employee ';
import { Expense } from './Core Models/Expense';
import { PaymentMethod } from './Core Models/PaymentMethod';
import { Payment } from './Core Models/Payment';
import { Debt } from './Core Models/Debt';
import { GeneralLedger } from './Core Models/GeneralLedger';
import { ChartOfAccounts } from './Core Models/ChartOfAccounts';
import { VaccinationSchedule } from './Core Models/VaccinationSchedule';
import { HealthLog } from './Core Models/HealthLog';
import { Attendance } from './Core Models/Attendance';
import { Payroll } from './Core Models/Payroll';
import { DailyReport } from './Core Models/DailyReport';
import { PerformanceMetric } from './Core Models/PerformanceMetric';
import { Equipment } from './Core Models/Equipment';
import { MaintenanceSchedule } from './Core Models/MaintenanceSchedule';
import { BiosecurityLog } from './Core Models/BiosecurityLog';
import { QualityControl } from './Core Models/QualityControl';
import { FinancialTransaction } from './Core Models/FinancialTransaction';
import { PoultryBatch } from './Core Models/PoultryBatch';
import { PoultryType } from './Core Models/PoultryType';
import { SlaughterRecord } from './Core Models/SlaughterRecord';
import { CycleSummary } from './Core Models/CycleSummary';
import { EggInventory } from './Core Models/EggInventory';
import { Receipt } from './Core Models/Receipt';
import { PurchaseDetail } from './Core Models/purchase-detail';
import { EmployeeModule } from './employee/employee.module';
import { SaleModule } from './sale/sale.module';
import { PoultryModule } from './poultry/poultry.module';
import { CustomerModule } from './customer/customer.module';
import { BiosecurityLogModule } from './biosecurity-log/biosecurity-log.module';
import { SalesReturnModule } from './SalesReturn/SalesReturn.Module';
import { EggInventoryModule } from './EggInventory/EggInventory.Module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreedModule } from './breed/breed.module';
import { DailyReportModule } from './DailyReport/DailyReport.Module';
import { DebtModule } from './Debt/debt.module';
import { FarmModule } from './farm/farm.module';
import { HealthLogModule } from './health-log/health-log.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SupplierModule } from './supplier/supplier.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { FeedConsumptionModule } from './feed-consumption/feed-consumption.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';
import { FrozenPoultryInventoryModule } from './frozen-poultry-inventory/frozen-poultry-inventory.module';
import { GeneralLedgerModule } from './general-ledger/general-ledger.module';
import { MaintenanceScheduleModule } from './maintenance-schedule/maintenance-schedule.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PayrollModule } from './payroll/payroll.module';
import { PerformanceMetricModule } from './performance-metric/performance-metric.module';
import { PoultryBatchModule } from './poultry-batch/poultry-batch.module';
import { QualityControlModule } from './quality-control/quality-control.module';
import { ReceiptModule } from './receipt/Receipt.Module';
import { SpoilageLossModule } from './SpoilageLoss/SpoilageLoss.Module';
import { TreatmentScheduleModule } from './TreatmentSchedule/TreatmentSchedule.Module';
import { VaccinationScheduleModule } from './VaccinationSchedule/VaccinationSchedule.Module';
import { EggProductionModule } from './EggProduction/EggProduction.Module';
import { ExpenseModule } from './Expense/Expense.Module';
import { FeedModule } from './feed/feed.module';
import { JournalEntryModule } from './journal-entry/journal-entry.module';
import { MedicationModule } from './medication/medication.module';
import { MortalityModule } from './mortality/mortality.module';
import { PurchaseReturnModule } from './purchase-return/purchase-return.module';
import { InventoryTakeDetailModule } from './inventory-take-detail/inventory-take-detail.module';
import { SlaughterhouseModule } from './slaughterhouse/slaughterhouse.module';
import { PoultryTypeModule } from './poultry-type/poultry-type.module';

import { Slaughterhouse } from './Core Models/slaughterhouse';

import { SaleDetail } from './Core Models/sale-detail';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { Vaccine } from './Core Models/Vaccine';
import { CoopModule } from './coop/coop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // أو اسم الخادم الخاص بك
      port: 5432, // المنفذ الافتراضي لـ PostgreSQL
      username: 'postgres', // اسم المستخدم الخاص بك
      password: 'zafer4519932093', // كلمة المرور الخاصة بك
      database: 'poultry_farm_db', // اسم قاعدة البيانات
      synchronize: true, // **هام:** قم بتغيير هذا إلى false في بيئة الإنتاج
      entities: [
        Poultry,
        Breed,
        Shed,
        Farm,
        EggProduction,
        FrozenPoultryInventory,
        SpoilageLoss,
        InventoryTakeDetail,
        Feed,
        Medication,
        FeedConsumption,
        Mortality,
        TreatmentSchedule,
        Purchase,
        PurchaseReturn,
        PurchaseReturnDetail,
        Sale,
        SalesReturn,
        SalesReturnDetail,
        Supplier,
        Customer,
        User,
        Role,
        Employee,
        Expense,
        PaymentMethod,
        Payment,
        Debt,
        GeneralLedger,
        ChartOfAccounts,
        VaccinationSchedule,
        HealthLog,
        Attendance,
        Payroll,
        DailyReport,
        PerformanceMetric,
        Equipment,
        MaintenanceSchedule,
        BiosecurityLog,
        QualityControl,
        FinancialTransaction,
        PoultryBatch,
        EggInventory,
        Receipt,
        PurchaseDetail,
        Slaughterhouse,
        SaleDetail,
        Vaccine,
        PoultryType,
        SlaughterRecord,
        CycleSummary,
      ],
    }),
    PoultryModule,
    SaleModule,
    CustomerModule,
    EmployeeModule,
    FarmModule,
    PurchaseModule,
    SupplierModule,
    HealthLogModule,
    BreedModule,
    VaccineModule,
    DailyReportModule,
    DebtModule,
    EggInventoryModule,
    SalesReturnModule,
    AttendanceModule,
    BiosecurityLogModule,
    ChartOfAccountsModule,
    EquipmentModule,
    FeedConsumptionModule,
    FinancialTransactionModule,
    FrozenPoultryInventoryModule,
    GeneralLedgerModule,
    MaintenanceScheduleModule,
    PaymentModule,
    PaymentMethodModule,
    PayrollModule,
    PerformanceMetricModule,
    PoultryBatchModule,
    QualityControlModule,
    ReceiptModule,
    EggProductionModule,
    ExpenseModule,
    FeedModule,
    JournalEntryModule,
    MedicationModule,
    MortalityModule,
    PurchaseReturnModule,
    SpoilageLossModule,
    TreatmentScheduleModule,
    VaccinationScheduleModule,
    RoleModule,
    UserModule,
    CoopModule,
    InventoryTakeDetailModule,
    SlaughterhouseModule,
    PoultryTypeModule
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule { }
