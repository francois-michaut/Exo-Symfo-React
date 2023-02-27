<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    public function getUsers(UsersRepository $repository, SerializerInterface $serializer, UserService $age): JsonResponse
    {

        $users = $repository->findAll();

       foreach($users as $user) {
        $user->setAge($age->getAgeOfUser(($user)));
       }
        
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
     * @Route("/api/deleteUser/{id}", name="api_delete_user", methods="DELETE")
     */
    public function deleteUser($id, UsersRepository $repository, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $user = $repository->find($id);

        $em->remove($user);
        $em->flush();

        $users = $repository->findAll();


        $jsonContent = $serializer->serialize($users, 'json',['groups' => 'users:read']);

        $response = new JsonResponse();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin',  '*');

        $response->setContent($jsonContent);

         return $response;
    }

    /**
     * @Route("/api/addUser", name="api_add_user", methods="POST")
     */
    public function addUser(EntityManagerInterface $em, Request $request, SerializerInterface $serializer): Response
    {
       try{
            $user = $request->getContent();
            $user = $serializer->deserialize($user, Users::class, 'json');
            $em->persist($user);
            $em->flush();
       }
       catch(Exception $e) {
        return $this->json(
            "JSON mal formé",
            Response::HTTP_UNPROCESSABLE_ENTITY
        );
       }
      
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin',  '*');
        
        return $response->setContent('utlisateur créé');

    }
}
