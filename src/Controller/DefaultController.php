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
     * @Route("/api/users", name="api_users", methods={"GET"})
     */
    public function getUsers(UsersRepository $repository, SerializerInterface $serializer): JsonResponse
    {

        $users = $repository->findAll();


        $jsonContent = $serializer->serialize($users, 'json',['groups' => 'users:read']);

        $response = new JsonResponse();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin',  '*');

        $response->setContent($jsonContent);


        return $response;
    }
    /**
     * @Route("api/user/detail/{id}", name="api_find_user", methods={"GET"})
     */
    public function getUserById($id, UsersRepository $repository, SerializerInterface $serializer): Response
    {
        $user = $repository->find($id);
        $jsonContent = $serializer->serialize($user, 'json' ,['groups' => 'users:read']);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin',  '*');

        $response->setContent($jsonContent);

        return $response;
    }

    /**
     * @Route("/api/deleteUser/{slug}", name="api_delete_user")
     */
    public function deleteUser($slug)
    {
        
        dump($slug);

        // $response = 'Utilisateur détruit';

        //  return $response;
    }
}
