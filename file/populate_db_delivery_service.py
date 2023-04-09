if __name__ == '__main__':
    from faker import Faker
    import random

    fake = Faker()
    n = 1000
    times = 10_000
    file_name = "delivery_"
    file_ext = ".sql"
    header = "INSERT INTO application_deliveryservice (delivery_person, fee, date, pickup, details, buyer_id, " \
             "car_id) VALUES"
    for j in range(times):
        with open(f"/home/lucas/ubumbu/university/UNI/Semester 4/SDI/lab-5x-916-Lucas-Sipos/file/delivery_service/{file_name}{j}{file_ext}", "w") as file:
            print(header, file=file)
            for i in range(n):
                if i != n - 1:
                    print(
                        f"('{fake.first_name()}',{random.randrange(0,1000)},'{fake.date_time()}',{fake.boolean()},'{fake.text()}',{random.randrange(1,1_000_001)},{random.randrange(1,1_000_001)}),",
                        file=file)
                else:
                    print(
                        f"('{fake.first_name()}',{random.randrange(0,1000)},'{fake.date_time()}',{fake.boolean()},'{fake.text()}',{random.randrange(1,1_000_001)},{random.randrange(1,1_000_001)})",
                        file=file)
        print(f"{j+1}/{times}")
