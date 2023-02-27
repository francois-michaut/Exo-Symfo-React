<?php

namespace App\Service;

use App\Entity\Users;

class UserService
{
    public function getAgeOfUser(Users $user): string
    {
       $birthDate = $user->getBirthDate();
       $birthDateUser = $birthDate->format('Y-m-d');
       $today = date("Y-m-d");

       $diff = date_diff(date_create($birthDateUser), date_create($today));

       return $diff->format('%y');
    }
}