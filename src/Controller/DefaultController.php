<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/users", name="api_users")
     */
    public function getUsers(UsersRepository $repository, PersistenceManagerRegistry $doctrine, SerializerInterface $serializer): JsonResponse
    {
        $repository = $doctrine->getRepository(Users::class);

        $users = $repository->findAll();

        //    dump($users);
        $jsonContent = $serializer->serialize($users, 'json');

        $response = new JsonResponse();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin',  '*');

        $response->setContent($jsonContent);


        return $response;
    }
}
